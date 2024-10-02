const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask) // create Postman requests & save -> pic: postman placeholder
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
