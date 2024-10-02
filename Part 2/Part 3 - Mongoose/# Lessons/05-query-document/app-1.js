const express = require('express')
const app = express()

const mongoose = require('mongoose')
////////////////////////////////////////////////
// CONNECT TO MONGODB
////////////////////////////////////////////////

mongoose.set('strictQuery', true)

// (***) need to use 127.0.0.1 instead of localhost
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

///////////////////////////////////////
// Model methods
///////////////////////////////////////

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Selena',
    tags: ['angular', 'front-end'],
    isPublished: true,
  })

  await course.save()
}
// createCourse()

// (1)
async function getCourse() {
  // const courses = await Course.find()
  const courses = await Course.find({ name: 'Angular Course' })

  console.log(courses)
}

// (2)
getCourse()

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
