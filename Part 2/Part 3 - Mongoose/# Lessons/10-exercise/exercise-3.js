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

// Exercise 3:
// Get all the published courses that are $15 or more, or have the word 'by' in their title

const getCourses = async () => {
  const courses = await Course.find({
    isPublished: true,
  })
    .or([
      {
        price: {
          $gte: 15,
        },
      },
      { name: /.*by.*/i },
    ])
    .select({ name: 1, author: 1, price: 1, isPublished: 1 })
    .sort({ price: -1 })

  return courses
}

async function run() {
  const courses = await getCourses()
  console.log(courses)
}

run()
