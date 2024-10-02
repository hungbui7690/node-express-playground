const express = require('express')
const app = express()
const morgan = require('morgan')
const courses = require('./routes/courses')

///////////////////////////////////////
// Middleware & Routes Handlers
///////////////////////////////////////

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Hey there!' })
})

app.use(courses)

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////

const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
