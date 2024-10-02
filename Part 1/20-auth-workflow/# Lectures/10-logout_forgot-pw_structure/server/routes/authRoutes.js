const express = require('express')
const router = express.Router()

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

// (1) xong vào postman + frontend để test >> xong sang jwt.js
const { authenticateUser } = require('../middleware/authentication')

router.post('/register', register)
router.post('/login', login)
router.post('/verify-email', verifyEmail)

// (2) đổi thành delete >> sang authController
router.delete('/logout', authenticateUser, logout)
// router.get('/logout', logout)

// (6) setup trong postman
router.post('/reset-password', resetPassword)
router.post('/forgot-password', forgotPassword)

module.exports = router
