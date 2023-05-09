// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const { engine } = require("express-handlebars")
const movieList = require('./movies.json')

// setting template engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase())
  })
  res.render('index', {movies: movies, keyword: req.query.keyword})
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(
    movie => movie.id.toString() == req.params.movie_id
  )
  res.render('show', { movie: movie })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})