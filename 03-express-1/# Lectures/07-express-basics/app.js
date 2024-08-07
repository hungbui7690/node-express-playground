/*
  Express Basics
  - HTTP Verbs
    + app.get
    + app.post
    + app.put
    + app.delete
    + app.all => work with all above
    + app.use
    + app.listen(5000, ()=> {}) 
      > similar to server.listen() in HTTP


  - res.send(string or html) 
  - res.all(*) 
    > handle 404 
    > this will catch all actions that we don't want to cover
      => so, all the actions, routes that we have not setup will jump into .all()


  - res.status(xxx).send(): always go with status code to control


  @@ npm install express --save
  @@ npm i express@4.17.1 --save 
     > install specific version

*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log(`user hit the resource`)
  res.status(200).send('Homepage')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

// error route handle using .all()
app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
