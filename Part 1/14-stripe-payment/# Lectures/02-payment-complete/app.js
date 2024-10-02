/*
  Payment Complete
  1. controller -> change function name to stripeController -> avoid collision since we need to import stripe
  2. create .env -> add api key & secret 
  3. controller: 
    - const stripe = require('stripe')(process.env.STRIPE_SECRET) 
    -> SECRET, but not KEY


  - if we logout paymentIntent -> client_secret -> we want to send this back to front end 

******************************

  Note: 
  1. in backend, we just calculate & compare total -> then create paymentIntent to send clientSecret to client 
  2. to calculate total amount -> get from DB and calculate to have correct value -> but not from client -> because client data is easy to manipulate
    + items id will be sent from client to backend -> backend then connect to db to get the real price -> calculate backend, then compare -> here we have demo project -> not connect to DB
  3. card inputs for testing 
    -> MM/YY must be in the future 
    -> Zip code must have 5 digits 
  4. successful -> dashboard -> developers -> payments to verify


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// controller
const stripeController = require('./controllers/stripeController')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public'))

// stripe
app.post('/stripe', stripeController)

// error
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// ======================================
// SERVER & PORT
// ======================================

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
