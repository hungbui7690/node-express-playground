/*
  JSON Basics
  - if we go to https://course-api.com/ 
    > we will see many APIs that we will build in this course

  - later, when we learn React => we we will these data (JSON) to build React App
  - no need to use React, we also can use Javascript to build (built in JS Course)
    > in server, we need to setup data, and when someone needs, they just need to access to data and build anything they want


****************************

  - docs => https://expressjs.com/en/api.html#express.json => search res.json() 
  
  @@ res.json() 
    + Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
    + The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
    + Network => Content-Type: application/json

*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json([{ name: 'john' }, { name: 'susan' }]) // *** if we go to server, we can access and uses this to build app
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
