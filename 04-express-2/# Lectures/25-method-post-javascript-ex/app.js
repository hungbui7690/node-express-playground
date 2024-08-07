/*  
  POST    Insert Data     store.com/api/orders          place an order (send data)

  - when we start the app: 
    + client will send GET request to /api/people to fetch all data
    + when we click on Submit button, send POST request to /api/people to handle this request


  1. in this lesson, instead of using "form", we can also use "JS" to perform HTTP request to server > use AXIOS (check javascript.html)
      -> so, we don't need: app.use(express.urlencoded({ extended: false }))
      -> now, we need to use: app.use(express.json())

  2. after we create the route for POST /api/people in server
      -> test: we will receive the file people in Network tab > POST method > pic: post-javascript
      -> check Content-Type, we will see application/json

  3. add app.use(express.json()) -> if we don't have this line -> we cannot access to req.body (in JS)
  
  4. res.status().json() 
      -> use .json() but not .send() anymore


  *** must have: app.use(express.json()) -> otherwise, "undefined"

  *** Note: res.status(201).json({ success: true, person: name })
      -> server & client must use the same format
      -> server must send the correct format: { success: true, person: name } 
      -> so that client (JS) can access and update UI


**************************

  (1) /methods-public/javascript.html -> we will see that it use the route /api/people


  @@ app.use(express.json())
  @@ res.status(201).json({ success: true, person: name })

*/

const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.json()) // parse json

app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

app.post('/login', (req, res) => {
  console.log(req.body)

  const { name } = req.body

  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please provide credentials')
})

// in this lesson, we will work with this route
app.post('/api/people', (req, res) => {
  console.log(req.body)
  const { name } = req.body

  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })

  res.status(201).json({ success: true, person: name })
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
