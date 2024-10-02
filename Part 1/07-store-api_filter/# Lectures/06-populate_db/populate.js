require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProduct = require('./products.json') // load data from JSON file

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // 1. Connect to DB
    console.log('Success Connecting to DB...')

    // 2. populate:
    await Product.deleteMany() // clear all data
    await Product.create(jsonProduct) // base on model, create data
    console.log('Success Populating to DB...')

    process.exit(0) // 3. exit when complete
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start() // (4)
