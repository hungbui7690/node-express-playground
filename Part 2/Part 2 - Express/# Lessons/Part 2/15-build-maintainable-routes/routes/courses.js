const express = require('express')
const router = express.Router()
const Joi = require('joi')

const logger = require('../logger')

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
  { id: 4, name: 'course 4' },
]

// Get All Courses
router.get('/api/courses', (req, res) => {
  res.send(courses)
})

// *** use middleware logger here
router.use(logger)

router.use((req, res, next) => {
  console.log('Authenticating...')
  next()
})

// Get Course by ID
router.get('/api/courses/:id', (req, res) => {
  const courseID = req.params.id

  const course = courses.find((c) => c.id === Number(courseID))
  if (!course)
    return res
      .status(404)
      .send(`The course with the ID ${courseID} does not exist`)

  res.status(200).send(course)
})

// Create Course
router.post('/api/courses', (req, res) => {
  const result = validateCourse(req.body)

  if (result.error) {
    const { message } = result.error.details[0]
    return res.status(400).send(message)
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }

  courses.push(course)
  res.status(201).send(course)
})

// Update Course
router.put('/api/courses/:id', (req, res) => {
  const courseID = req.params.id
  const course = courses.find((c) => c.id === Number(courseID))
  if (!course)
    return res
      .status(400)
      .send(`The course with the ID ${courseID} does not exist`)

  const result = validateCourse(req.body)
  if (result.error) {
    const { message } = result.error.details[0]
    return res.status(400).send(message)
  }

  course.name = req.body.name
  res.send(course)
})

// Delete Course
router.delete('/api/courses/:id', (req, res) => {
  const courseID = req.params.id
  const course = courses.find((c) => c.id === Number(courseID))
  if (!course)
    return res
      .status(400)
      .send(`The course with the ID ${courseID} does not exist`)

  const index = courses.indexOf(course)
  courses.slice(index, 1)

  res.status(200).send(course)
})

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  })
  return schema.validate(course)
}

module.exports = router
