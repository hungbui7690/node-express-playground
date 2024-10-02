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
// createCourse()

//////////////////////////////////////////////////////////
// COMPARISON QUERY OPERATORS
/*
  (***) Run this in Studio 3T

  db.getCollection("courses").insertMany([
    {name: "React", author: "John Doe", price: 10, tags: ["react", "frontend"], isPublished: true},
    {name: "NodeJS", author: "Ken Gold", price: 7.99, tags: ["node", "backend"], isPublished: true},
    {name: "Angular", author: "Doe Doe", price: 12, tags: ["angular", "frontend"], isPublished: false},
    {name: "Python", author: "Peter Pan", price: 18, tags: ["python", "backend"], isPublished: true},
  ])  
*/

async function getCourse() {
  const courses = await Course.find({
    // price: { $gte: 10, $lt: 16 },
    price: { $in: [7.99, 12] },
  }).select({ name: 1, price: 1 }) // select fields we want

  console.log(courses)
}
getCourse()

////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////

app.listen(3000, () => console.log('Listening on port 3000...'))
