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
  isPublished: Boolean,
})

// model is similar to class > and Schema is similar to properties in Class
const Course = mongoose.model('Course', courseSchema)

// create instance from Course model
const course = new Course({
  name: 'NodeJS Course',
  author: 'John Doe',
  tags: ['node', 'backend'],
  isPublished: true,
})

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
