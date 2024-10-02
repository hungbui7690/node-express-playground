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

async function getCourse() {
  const pageSize = 10
  const pageNumber = 2
  const courses = await Course.find({ author: /doe/i })
    .skip(pageNumber - 1 * pageSize)
    .limit(pageSize)

  console.log(courses)
}

// This method is used when we want to update directly from database > without checking
async function updateCourse(id) {
  const result = await Course.findOneAndUpdate(
    { _id: id },
    {
      author: 'Jack Sparrow',
      price: 5,
    },
    { new: true }
  )

  console.log(result)
}

updateCourse('63fc86f983252a5d8d9e2130')

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
