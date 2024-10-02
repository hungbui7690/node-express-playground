// === (1)
const express = require('express')

// === (2)
const router = express.Router()

// === (3) lúc này thay vì app.post() >> sẽ sử dụng router.post() >> chú ý: url là /
router.post('/', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please prodide credentials')
})

// === (4) sang /routes/people.js
module.exports = router
