const express = require('express')
const router = express.Router()
const { getAllTasks } = require('../controllers/tasks') // import controller

router.route('/').get(getAllTasks) // *** app.js: must be /api/v1/tasks

module.exports = router // go to app.js
