/*
  GET     Read Data       store.com/api/orders          get all orders
  GET     Read Data       store.com/api/order/:id       get single order (path param)
  POST    Insert Data     store.com/api/orders          place an order (send data)
  PUT     Update Data     store.com/api/order/:id       update specific order (params + send data)
  Delete  Delete Data     store.com/api/order/:id       delete order (path param)

  *** remember: we use plurals (orders) and singular (order) depends on what we want to get back

*/

const express = require('express')
const app = express()
let { people } = require('./data')

// ***
app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
