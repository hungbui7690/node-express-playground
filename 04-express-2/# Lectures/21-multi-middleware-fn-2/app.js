/*
  Assume we want to add 2 middlewares (mdw) for /api/items -> but we DON'T want to add to other routes 
  - just need to put that array into that route 
  - no need to use 2 app.use(), just need only 1


  - we have 3 options for mdw: 
    1. self create (we're doing now) => [authorize, logger]
    2. express
      - express has a lot mdw -> just need to read docs and pass options 
        > ex: static asset is mdw
        > app.use(express.static('./public'))
    3. 3rd party -> with this, we need to install -> ex: morgan (download in npm)
      - npm i morgan 
      - to test, comment the mwd static asset line 
        + then go to homepage + refresh -> log info
      - if we want to use 2 mdw at the same time -> array

  @@ app.get('/api/items', [logger, authorize], (req, res) => {}

*/

const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')
const morgan = require('morgan')

app.use([morgan('tiny'), express.static('./public')]) // use morgan + static at the same time -> use array

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('About')
})

// now, logger & authorize just ONLY WORK with /api/items
app.get('/api/items', [logger, authorize], (req, res) => {
  console.log(req.user)
  res.send('About')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
