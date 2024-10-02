/*
  POST    Insert Data     store.com/api/orders          place an order (send data)


  - in this lesson, we learn how to insert data to server using POST method
    + method_public/
      -> we need this to test POST method (this has the form to send to server)
      -> because we cannot test POST method by using browser like before -> need to have Front-End to send data to server
    + use app.use() so that we can use static asset 
      > now open browser, we can see form with 2 options
        + Regular Option
        + Javascript Option


  *** NOT ONLY we can use /method-public to setup the front-end (form) to test, we CAN ALSO use POSTMAN or INSOMNIA to test

*/

const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public')) // static asset

app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
