//////////////////////////////////////////
// run this to import data to mongodb (need to install mongodb import-tool)
// > mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

// Exercise:
// Get all the published backend courses, sort them by their name, pick only their name and author, and display them

const mongoose = require('mongoose')

// (1) (***) if this set to true > query will return wrong data
mongoose.set('strictQuery', false)
mongoose
  .connect('mongodb://127.0.0.1:27017/mongo-exercises')
  .then((result) => console.log('Connected to DB...'))
  .catch((err) => console.log(err))

// (2)
const schema = new mongoose.Schema({
  tag: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
})

// (3)
const Course = mongoose.model('Course', schema)

// Exercise:
// Get all the published backend courses, sort them by their name, pick only their name and author, and display them

// (4)
const getCourses = async () => {
  const courses = await Course.find({
    isPublished: true,
    tags: 'backend',
  })
    .select({ name: 1, tags: 1, isPublished: true })
    .sort({ name: 1 })

  return courses
}

async function run() {
  const courses = await getCourses()
  console.log(courses)
}

run()
