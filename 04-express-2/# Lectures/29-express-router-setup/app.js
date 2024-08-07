/*  
  - now, everything is ok, but app.js grows bigger and busier because we will have more and more routes
    + use EXPRESS ROUTER to group those routes together
    + we also have a lot of logic duplication -> setup CONTROLLERS
  
  - in the future, we will use MVC model, now missing model since we haven't touch to DB


**************************

  - we have 1 route /login and many routes /api/people 
    + group /api/people to 1 place, and /login to 1 place

  Steps: 
  1. create folder /routes -> create 2 files people.js (/api/people) & auth.js (/login) in routes/
  2. setup routes & copy all relative ones into /api/people in people.js
  3. module.exports = router
  4. app.js:
      a. import router 
      b. app.use('/api/people', peopleRouter)
  5. /routes/people.js 
      > change path from "/api/people" to "/" (because we create base path in 4b)


**************************

  (1) create routes/auth.js

*/

const express = require('express')
const app = express()

const peopleRouter = require('./routes/people') // import router
const authRouter = require('./routes/auth')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/*
  Note: must be "/api/people", but NOT "api/people" => Missing / at the beginning will cause issues
  + /api/people/postman
  + /api/people/1234
*/
app.use('/api/people', peopleRouter)
app.use('/login', authRouter)

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
