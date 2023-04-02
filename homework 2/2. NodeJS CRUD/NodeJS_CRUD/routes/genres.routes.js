const Router = require('express')
const router = new Router
const genresController = require('../controller/genres.controller')

router.post('/genre', genresController.createGenre)
router.get('/genre/movie/:id', genresController.getGenresOfMovie)
router.post('/genre/movie/:id', genresController.addGenreToMovie)
router.put('/genre', genresController.updateGenre)
router.delete('/genre/:id', genresController.deleteGenre)



module.exports = router