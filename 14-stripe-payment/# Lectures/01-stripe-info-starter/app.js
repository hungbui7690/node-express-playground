/*
  Info
  - We need Front End for this project
  - localhost:5000 -> UI -> some error in console -> now we don't need to care about these


***************************
  General Overview
  - Client -> when we get the total payment of user -> DON'T SEND DIRECTLY TO STRIPE -> not secure
  - because of that, we need to communicate with backend 
  - in react course, we will build serverless app -> but here, we use NodeJS 

    + network tab -> create-payment-intent -> scroll down to Form-Data -> info of the card (name, price, shipping fee, total...)
    + after getting all info, backend will communicate to stripe and send these infos there
    
  -> In general, we don't send data directly to stripe from Client
  -> but from client, communicate with backend 
  -> then backend will send data to stripe


  - Client has Stripe Key
  - Backend has Stripe Secret


  1. Client sends checkout info (items, price, total ...) to backend 
  2. Backend checks those infos -> then send back secret to client
  3. Client then communicate to Stripe server


**************************
  API Key
  - stripe.com -> create account
  - dashboard -> developers -> publishable key & secret -> copy to .env


**************************
  Flow Overview
  - Help -> Docs -> Payment -> Accept Online Payment
  - Stripe will provide code for us 
    -> Choose NodeJS as Backend, HTML as Client
    -> https://docs.stripe.com/payments/quickstart

  


  @@ Don't choose "Prebuilt Payment Flow" -> but choose "Custom Payment Flow"

  - html file has some script for Stripe 
    -> checkout.js: js code
    -> server.js: nodeJS code

  - in NodeJS Server, we will handle POST request for /create-payment-intent 

  
  Step: 
  - /public/browser-app.js -> paste api key here


***********************
  Controller Setup
  1. check js file -> fetch('/stripe') -> we will create same in backend
  2. app.js -> create route /stripe
  3. controller -> req.body -> receive front end info 
  
  *** Note: JS, we hard code these info -> but in real world app, we don't -> When click Checkout button -> send info to backend
  
  - when we have req.body -> we will do 2 things (next lesson): 
    + verify cost of items if it is same as Client sends to us
    + communicate with stripe and get client secret 


  Why do we do this? 
  - browser-app.js -> scroll down to form -> payWithCard() has data.clientSecret -> this is why we need to connect to stripe to get client secret
  - because we don't have it right now -> Client causes error 


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

// # STRIPE
app.post('/stripe', stripeController)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

///////////////////
// SERVER & PORT
///////////////////

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
