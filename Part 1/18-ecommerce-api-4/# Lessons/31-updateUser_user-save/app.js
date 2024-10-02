/*
  updateUser with pre save hook

  - [] add authenticateUser middleware in the route
  - [] check for name and email in the body
  - [] if one is missing, send 400 (optional)
  - [] use findOneAndUpdate()
  - [] create token user, attachCookiesToResponse and send back the tokenUser


**************************

  - without this line -> password will be hashed twice
    @@ if (!this.isModified('password')) return 
    
  - same as previous lesson -> but use user.save()


  1. model -> pre save hook -> log out 
  2. postman -> we don't see log 

  
  3. controller -> user.save()
    - test in postman -> will see pre save hook run -> we are messing with password
    - /login -> cannot login -> because password is hashed twice

  4. fix: 
    - log out this.modifiedPaths:
      -> update email:          [ 'email' ] 
      -> update email & name:   [ 'email' 'name' ] 

    @@ this.isModified('name') -> check if field is modified or not 

  5. postman
      

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
