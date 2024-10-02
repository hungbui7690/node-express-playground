const express = require('express')
const app = express()
const Joi = require('joi')

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

app.get('/', (req, res) => {
  res.send('Hello World')
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
  // 1.
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  })

  // 2.
  const result = schema.validate(req.body)
  console.log(result)

  // 3. return message if there are any errors
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

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////

// setup port in env > export PORT=5000
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
