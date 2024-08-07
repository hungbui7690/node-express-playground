/*  
  Bearer Token
  - This lesson mostly about theory

  - Go to http://localhost:5000/ -> login -> token will be saved to localStorage
  - When click on "get data" -> will takeout token and display in FrontEnd
    + now if we check Network tab -> /dashboard -> Authorization -> will see "Bearer token"


  - browser-app.js -> when we get data 
      const { data } = await axios.get('/api/v1/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    + this is when we use axios -> we will send token with headers => that why we see Bearer in Network Tab


  - Bearer: we can think it as "grant access to person who has this code"
  - Bearer Token: is a string that no one can understand -> it is created by server + some definitions depends on each company -> anyone wants to access to his/her resource, they need to has this token


***************************

  - Test with Postman -> pic: postman-dashboard
    + /login -> after login, we have token -> copy token
    + /dashboard 
      -> Headers tab -> New Key:Value pair = Authorization:<token>
      -> send

  - check out server log -> we will see req.headers of /dashboard contains token 
  - next lesson, we will check the token, if token is correct, we will send back payload (now, it's hard code)
  
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
