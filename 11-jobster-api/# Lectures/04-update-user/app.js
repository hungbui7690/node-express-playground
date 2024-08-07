/*
  Update User Functionality
  - UI -> Profile tab -> try to update -> not work
    + check network tab -> request is sent to /auth/updateUser -> we don't have this 

  - in auth route: 
    + import authenticateUser middleware
    + setup updateUser route (protected route) & controllers

  1. routes/auth.js
    -> updateUser -> same as update profile for user 
    -> UI -> Profile tab


**************************

  - User model -> "pre save" hook -> we hash the password 
      pre('save', async function () {
        this.password = await bcrypt.hash(this.password, salt)
      })

  @@ If we use: await user.save() -> this will trigger "pre save" hook -> then hash our password 1 more time -> it will change to other password -> then we cannot login

  - To solve this problem, we use: 
    ~~ this.isModified("password"): check if we modified password field or not

      UserSchema.pre('save', async function () {
        if (!this.isModified('password')) return
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
      })

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path') // 1.

// extra security packages
const helmet = require('helmet')
const xss = require('xss-clean')

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static(path.resolve(__dirname, './client/build'))) // 2.

app.use(express.json())
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// 3. serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
