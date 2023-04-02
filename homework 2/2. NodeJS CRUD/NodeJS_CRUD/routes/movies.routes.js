const Router = require('express')
const router = new Router
const moviesController = require('../controller/movies.controller')

router.post('/movie', moviesController.createMovie)
router.get('/movie', moviesController.getMovies)
router.get('/movie/:id', moviesController.getOneMovie)
router.put('/movie', moviesController.updateMovie)
router.delete('/movie/:id', moviesController.deleteMovie)



module.exports = router