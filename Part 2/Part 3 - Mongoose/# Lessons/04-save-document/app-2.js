const express = require('express')
const app = express()

const mongoose = require('mongoose')
////////////////////////////////////////////////
// CONNECT TO MONGODB
////////////////////////////////////////////////

// (***) need to use this instead of localhost
mongoose
  .connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(`Could not connect to MongoDB...`, err))

////////////////////////////////////////////////
// SCHEMA
////////////////////////////////////////////////

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
})
const Course = mongoose.model('Course', courseSchema)

// (1) since .save() is async function > we need to use async/await
async function createCourse() {
  const course = new Course({
    name: 'NodeJS Course',
    author: 'John Doe',
    tags: ['node', 'backend'],
    isPublished: true,
  })

  await course.save()
}

createCourse()

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
