const express = require("express")
const moviesRouter = require('./routes/movies.routes')
const genresRouter = require('./routes/genres.routes')
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', moviesRouter)
app.use('/api', genresRouter)

app.listen(PORT, () => console.log(`server is running on ${PORT}`))
