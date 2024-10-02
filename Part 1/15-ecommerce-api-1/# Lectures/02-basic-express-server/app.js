/*
  Setup Basic Express Server

  - [] import express and assign to variable
  - [] setup start port variable (5000) and start function

 */

const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

const start = () => {
  try {
    app.listen(PORT, console.log(`Listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
