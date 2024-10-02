//////////////////////////////////////////
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose
  .connect('mongodb://127.0.0.1:27017/mongo-exercises')
  .then((result) => console.log('Connected to DB...'))
  .catch((err) => console.log(err))

const schema = new mongoose.Schema({
  tag: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
})
const Course = mongoose.model('Course', schema)

// Exercise 2:
// Get all the published frontend and backend courses, sort them by their price in a descending order, pick only their name and author, and display them

const getCourses = async () => {
  const courses = await Course.find({
    isPublished: true,
    tags: {
      $in: ['frontend', 'backend'],
    },
  })
    .select({ name: 1, author: 1 })
    .sort({ price: -1 })

  return courses
}

async function run() {
  const courses = await getCourses()
  console.log(courses)
}

run()
