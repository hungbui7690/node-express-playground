const express = require('express')
const router = express.Router()

const Joi = require('joi')

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
]

// Get All Genres
router.get('/api/genres', (req, res) => {
  res.send(genres)
})

// Get Genre by ID
router.get('/api/genres/:id', (req, res) => {
  const genreID = req.params.id

  const genre = genres.find((c) => c.id === Number(genreID))
  if (!genre)
    return res
      .status(404)
      .send(`The genre with the ID ${genreID} does not exist`)

  res.status(200).send(genre)
})

// Create Genre
router.post('/api/genres', (req, res) => {
  const result = validateGenre(req.body)

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
router.put('/api/genres/:id', (req, res) => {
  const genreID = req.params.id
  const genre = genres.find((c) => c.id === Number(genreID))
  if (!genre)
    return res
      .status(400)
      .send(`The course with the ID ${genre} does not exist`)

  const result = validateGenre(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    return res.status(400).send(message)
  }

  genre.name = req.body.name
  res.send(genre)
})

// Delete Genre
router.delete('/api/genres/:id', (req, res) => {
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

function validateGenre(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  })
  return schema.validate(course)
}

module.exports = router
