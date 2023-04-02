const db = require('../db')

class MoviesController {
    async createMovie(req, res) {
        const {movie_title, movie_year} = req.body
        const newMovie = await db.query(`INSERT INTO movie (movie_title, movie_year) 
                                         VALUES ($1, $2) 
                                         RETURNING *`, [movie_title, movie_year])

        res.json(newMovie.rows[0])
    }
    async getMovies(req, res) {
        const movies = await db.query(`SELECT * FROM movie`)
        res.json(movies.rows)
    }
    async getOneMovie(req, res) {
        const id = req.params.id
        const movie = await db.query(`SELECT * FROM movie 
                                      WHERE movie_id = $1`, [id])
        res.json(movie.rows[0])
    }
    async updateMovie(req, res) {
        const {movie_id, movie_title, movie_year} = req.body
        const user = await db.query(`UPDATE movie 
                                     SET movie_title = $1, movie_year = $2 
                                     WHERE movie_id = $3 
                                     RETURNING *`, [movie_title, movie_year, movie_id])
        res.json(user.rows[0])
    }
    async deleteMovie(req, res) {
        const id = req.params.id
        await db.query(`DELETE FROM movie_genre 
                        WHERE movie_id = $1`, [id]);
        const movie = await db.query(`DELETE FROM movie 
                                      WHERE movie_id = $1 
                                      RETURNING *`, [id])
        res.json(movie.rows[0])
    }
}

module.exports = new MoviesController();