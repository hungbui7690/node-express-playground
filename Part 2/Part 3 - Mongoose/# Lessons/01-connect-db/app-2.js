const express = require('express')
const app = express()

const mongoose = require('mongoose')

// We don't need to create database in MongoDb > we just need to work here, then after create collection, Mongoose will create the DB for us
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(`Could not connect to MongoDB...`, err))

app.listen(3000, () => console.log('Listening on port 3000...'))
