/*
  (1) create file authorize.js & export
  (2) app.js -> import 

  - app.use([logger, authorize]) 
    > app.use() receives array
    > the one that places before in the array will run first

  - in authorize.js, we add "user" into "req" 
    > this is important, because in app.js, we can take it out to use
      > check JWT, if token exists, we will communicate with db and take that user out 
      > then put the ID into req.user

  - middleware is like a lego piece -> many pieces which group together will create a server

  - TEST CASE
    - These 2 go through authorize middleware:
      > http://localhost:5000/?user=john 
      > http://localhost:5000/about/?user=john
        -> req.query = {user: 'john'}
        -> save user to request object

    > http://localhost:5000/api/items ->> logger
    > http://localhost:5000/api/items/?user=john -> logger + authorize
    

    @@ app.use([logger, authorize])

**************************

  Why we store data in req.user? 
  - Assuming your backend server is not compromised (bị tổn thương), req.user will stay only in your backend, which should be a trusted environment, and will not be sent back to your client via res by default.

  - Also, anything stored within req will only be available in the request itself, another request will have its own req instance, so data is not shared and should not leak to another request unless purposely made to do so.

  - However, you should always be staying on the ball, keep in mind to test and make sure all data sent back to your client does not have any sensitive info contained within them (e.g. password, tokens).

  - If you are not comfortable with storing that in req.user, you can always add a layer of middleware to strip the sensitive info before reaching your controller. This way, routes that use the middleware will not have sensitive info exposed.

*/

const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

app.use([logger, authorize]) // *** multi middlewares -> logger() will run before authorize()

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('About')
})

// http://localhost:5000/api/items/?user=john
app.get('/api/items', (req, res) => {
  // *** we can access req.user here because this route went through authorize middleware, and username is john
  console.log(req.user)
  res.send('/api/items')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
