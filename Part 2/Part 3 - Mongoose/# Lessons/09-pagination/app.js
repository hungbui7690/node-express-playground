const express = require('express')
const app = express()

const mongoose = require('mongoose')
////////////////////////////////////////////////
// CONNECT TO MONGODB
////////////////////////////////////////////////

mongoose.set('strictQuery', true)

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
  price: Number,
  isPublished: Boolean,
})
const Course = mongoose.model('Course', courseSchema)

///////////////////////////////////////
// Model methods
///////////////////////////////////////

async function createCourse() {
  const course = new Course({
    name: 'React Course',
    author: 'Selena',
    price: 10,
    tags: ['react', 'front-end'],
    isPublished: true,
  })
  await course.save()
}

// ======================================
// PAGINATION
// /api/courses/?pageNumber=2&pageSize=10 > 21-30
// skip = 2 * 10, limit = 10
// but page starts at 0 > skip = (pageNumber - 1) * pageSize
async function getCourse() {
  const pageSize = 10
  const pageNumber = 2
  const courses = await Course.find({ author: /doe/i })
    .skip(pageNumber - 1 * pageSize)
    .limit(pageSize)

  console.log(courses)
}
getCourse()

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
