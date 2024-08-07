/*  
  - right now, people.js file is messy 
    + we can setup callback functions into separated place 

  - Steps: 
    1. create /controllers/people.js
    2. takeout all middlewares in routes into functions into controllers
    3. export 
    4. import & use in each route

*/

const express = require('express')
const app = express()

const peopleRouter = require('./routes/people')
const authRouter = require('./routes/auth')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/people', peopleRouter)
app.use('/login', authRouter)

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
