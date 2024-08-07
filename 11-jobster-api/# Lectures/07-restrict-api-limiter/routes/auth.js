const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')
const { register, login, updateUser } = require('../controllers/auth')

const rateLimiter = require('express-rate-limit') // 5a.

// 5b.
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
})

router.post('/register', apiLimiter, register) // 5c. go to app.js
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser) // 3. add testUser middleware here

module.exports = router
