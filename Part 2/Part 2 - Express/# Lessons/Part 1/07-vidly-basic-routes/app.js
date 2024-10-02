const express = require('express')
const app = express()
const Joi = require('joi')

///////////////////////////////////////
// Data
///////////////////////////////////////

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
]

///////////////////////////////////////
// Middleware & Routes Handlers
///////////////////////////////////////

app.use(express.json())

// Get All Genres
app.get('/api/genres', (req, res) => {
  res.send(genres)
})

// Get Genre by ID
app.get('/api/genres/:id', (req, res) => {
  const genreID = req.params.id

  const genre = genres.find((c) => c.id === Number(genreID))
  if (!genre)
    return res
      .status(404)
      .send(`The genre with the ID ${genreID} does not exist`)

  res.status(200).send(genre)
})

// Create Genre
app.post('/api/genres', (req, res) => {
  const result = validateCourse(req.body)

  if (result.error) {
    const { message } = result.error.details[0]
    return res.status(400).send(message)
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres.push(genre)
  res.status(201).send(genre)
})

// Update Genre
app.put('/api/genres/:id', (req, res) => {
  const genreID = req.params.id
  const genre = genres.find((c) => c.id === Number(genreID))
  if (!genre)
    return res
      .status(400)
      .send(`The course with the ID ${genre} does not exist`)

  const result = validateCourse(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    return res.status(400).send(message)
  }

  genre.name = req.body.name
  res.send(genre)
})

// Delete Genre
app.delete('/api/genres/:id', (req, res) => {
  const genreID = req.params.id
  const genre = genres.find((c) => c.id === Number(genreID))
  if (!genre)
    return res
      .status(400)
      .send(`The course with the ID ${genreID} does not exist`)

  const index = genres.indexOf(genre)
  genres.slice(index, 1)

  res.status(200).send(genre)
})

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  })
  return schema.validate(course)
}

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////

// setup port in env > export PORT=5000
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
