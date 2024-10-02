const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getAllProductsStatic,
} = require('../controllers/products') // 4.

router.route('/').get(getAllProducts) // 5.
router.route('/static').get(getAllProductsStatic)

module.exports = router // 6. app.js
