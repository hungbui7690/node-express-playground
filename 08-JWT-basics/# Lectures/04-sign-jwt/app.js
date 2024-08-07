/*
  Signed JWT 
  - pic: jwt-overview

  - /login
    + if client sends the correct credentials to /login -> NodeJS will send back response (token) + Signed JWT
    + wrong credentials -> throw back error

  - /dashboard
    + client needs to send request with token to server
    + server checks for token, then manipulate with the request -> then send back response to client

  - why we don't use JWT, but NOT use random string? 
    + because JWT has security features that allow us to ensure about data integrity 

  - HTTP === stateless 
    + it cannot remember anything about previous requests that is sent by the same client 
    + so that, everytime sending request, client must provide valid token, or will be denied


*************************
  JWT Structure
  - jwt.io: 
    + Introduction: This information can be verified and trusted because it is digitally signed
    + Debugger

  - In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
    + Header: contain type of token, and algorithms
    + Payload: 
      > we can put info here when login or register -> typically has ID
      > info will be sent from JWT server to client 
      > client will send this info to NodeJS server 

  - Signature: 
          HMACSHA256(
            base64UrlEncode(header) + "." +
            base64UrlEncode(payload),
            secret)       
    + signature contains secret => and we need to save this secret in server
    @@ This is the format of JWT: xxxxx.yyyyy.zzzzz 

  - when we have enough info, we can sign and send back data (encoded-jwt3.png) -> check Debugger

  > pic: jwt.io

*************************

  - There are multiple JWT packages, and we use "jsonwebtoken" 
    @@ npm install jsonwebtoken

*************************

  Steps: 
  - use in controllers
  - import jwt
  - create token = jwt.sign(payload, secret, options)
    + Payload:
      -> we normally put username or ID in payload, but not other things like path...
      -> That user just can get its own resource -> just that user in the payload can access, and modify that resource
      -> in general, data in payload must be as small as possible, because it will be sent through wire -> good for UX
    + Secret: 
      -> create .env file and save in there.
      -> JWT_SECRET=jwtSecret -> this is the temp secret -> but in production, we must use "LONG, COMPLEX, AND UNGUESSABLE STRING VALUE" -> because if someone know our JwtSecret -> they can sign and get our data
          
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  - this is an example: expired in 30 days


  - test in postman: when we have token, take it out and paste to jwt.io -> can receive data that we want to send 


*************************

  1. create .env
  2. controllers/main.js
  3. postman test -> pic: create token 
    - when having token -> can take out data using debugger


  @@ jwt.sign(payload, secret, options) => using JWT algorithm to convert payload & secret into and random string (token)
  @@ with the token, we can go to jwt.io debugger to get back the payload

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1', mainRouter)

// notFound & error
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
