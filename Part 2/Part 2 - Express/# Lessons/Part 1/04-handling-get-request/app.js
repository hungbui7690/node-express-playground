const express = require('express')
const app = express()

// data
const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
  { id: 4, name: 'course 4' },
]

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

app.get('/api/posts/:year/:month', (req, res) => {
  const params = req.params
  const query = req.query
  res.send({ params, query })
})

// setup port in env > export PORT=5000
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
