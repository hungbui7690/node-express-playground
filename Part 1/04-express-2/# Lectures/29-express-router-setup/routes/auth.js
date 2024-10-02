const express = require('express')
const router = express.Router() // call Router() from express

// instead of using app.post() -> we will use router.post()
// path must be "/", NOT "/login"
router.post('/', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please provide credentials')
})

module.exports = router // to /routes/people.js
