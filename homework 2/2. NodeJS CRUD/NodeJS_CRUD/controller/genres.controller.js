const db = require('../db')

class GenresController {
    async createGenre(req, res) {
        const {genre_name} = req.body
        const newGenre = await db.query(`INSERT INTO genre (genre_name) 
                                        VALUES ($1) RETURNING *`, [genre_name])
        res.json(newGenre.rows)
    }
    async getGenresOfMovie(req, res) {
        const id = req.params.id
        const genres = await db.query(`SELECT genre_name 
                                       FROM genre
                                       INNER JOIN movie_genre USING(genre_id)
                                       WHERE movie_id = $1;`, [id])
        res.json(genres.rows)
    }
    async addGenreToMovie(req, res) {
        const movie_id = req.params.id
        const {genre_id} = req.body
        const movie_genres = await db.query(`INSERT INTO movie_genre 
                                             VALUES ($1, $2) RETURNING *`, [movie_id, genre_id])
        res.json(movie_genres.rows)
    }
    async updateGenre(req, res) {
        const {genre_id, genre_name} = req.body
        const genre = await db.query(`UPDATE genre 
                                   SET genre_name = $1 
                                   WHERE genre_id = $2 
                                   RETURNING *`, [genre_name, genre_id])
        res.json(genre.rows[0])
    }
    async deleteGenre(req, res) {
        const id = req.params.id
        await db.query(`DELETE FROM movie_genre 
                        WHERE genre_id = $1`, [id]);
        const movie = await db.query(`DELETE FROM genre 
                                      WHERE genre_id = $1 RETURNING *`, [id])
        res.json(movie.rows[0])
    }

}

module.exports = new GenresController()