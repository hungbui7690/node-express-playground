const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

////////////////////////////////////////////////
// CONNECT TO MONGODB
////////////////////////////////////////////////

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(`Could not connect to MongoDB...`, err))

////////////////////////////////////////////////
// SCHEMA
////////////////////////////////////////////////

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String], // array of string
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: boolean,
})

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
