const express = require('express')
const app = express()
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')

// DEBUGGER
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')

const logger = require('./logger')

///////////////////////////////////////
// Data
///////////////////////////////////////

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
  { id: 4, name: 'course 4' },
]

///////////////////////////////////////
// Middleware & Routes Handlers
///////////////////////////////////////

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

console.log(`Environment : ${config.get('name')}`)
console.log(`Password : ${config.get('mail.password')}`)

// DEBUGGER
// export DEBUG=app:db
// export DEBUG=
// export DEBUG=app:db,app:startup
// export DEBUG=app:*
// export DEBUG=app:* nodemon app.js
// > with this, we don't have to comment or clear the debugger like when we use console.log() after we finish debug
dbDebugger('connected to DB...')
startupDebugger('startup Debug...')

app.use(logger)
app.use((req, res, next) => {
  console.log('Authenticating...')
  next()
})

app.get('/', (req, res) => {
  res.send('Course API')
})

// Get All Courses
app.get('/api/courses', (req, res) => {
  res.send(courses)
})

// Get Course by ID
app.get('/api/courses/:id', (req, res) => {
  const courseID = req.params.id

  const course = courses.find((c) => c.id === Number(courseID))
  if (!course)
    return res
      .status(404)
      .send(`The course with the ID ${courseID} does not exist`)

  res.status(200).send(course)
})

// Create Course
app.post('/api/courses', (req, res) => {
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
app.put('/api/courses/:id', (req, res) => {
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
app.delete('/api/courses/:id', (req, res) => {
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

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////

const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
