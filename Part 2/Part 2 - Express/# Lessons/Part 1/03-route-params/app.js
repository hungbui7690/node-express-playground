const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/course', (req, res) => {
  res.send([1, 2, 3])
})

// req.params
app.get('/api/course/:id', (req, res) => {
  const params = req.params
  res.send(params)
})

// multi params
// req.query > /api/posts/2022/12/?name=joe&age=25
app.get('/api/posts/:year/:month', (req, res) => {
  const params = req.params
  const query = req.query
  res.send({ params, query })
})

// setup port in env > export PORT=5000
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
