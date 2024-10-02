const express = require('express')
const app = express()
const Joi = require('joi')

const genres = require('./routes/genres')

///////////////////////////////////////
// Middleware & Routes Handlers
///////////////////////////////////////

app.use(express.json())

app.use(genres)

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////

// setup port in env > export PORT=5000
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Listening on port ${port}...`))
