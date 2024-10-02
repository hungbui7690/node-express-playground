/*
  Basic Express Routes
  - packages:
    + "express": "^4.17.1",
    + "mongoose": "^5.11.10"
    + "dotenv": "^8.2.0",
    + "nodemon": "^2.0.7"


    1. npm install 
    2. npm start

*/

const express = require('express')
const app = express()

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

const port = 5000
app.listen(port, console.log(`Server is listening on port ${port}...`))
