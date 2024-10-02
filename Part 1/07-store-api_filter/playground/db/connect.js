const mongoose = require('mongoose')

// 1. return promise
const connectDB = (url) => {
  console.log('Connect to DB...')
  return mongoose.connect(url)
}

module.exports = connectDB
