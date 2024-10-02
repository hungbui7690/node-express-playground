const Task = require('../models/Task') // import model

const getAllTasks = (req, res) => {
  res.send('All items')
}

// use model here -> postman -> check pic: postman_create-task.png -> end
const createTask = async (req, res) => {
  const task = await Task.create(req.body) // 1. create task

  res.status(201).json({ task }) // 2. return to client
}

const getTask = (req, res) => {
  res.json({ id: req.params.id })
}

const updateTask = (req, res) => {
  res.json({ id: req.params.id })
}

const deleteTask = (req, res) => {
  res.json({ id: req.params.id })
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }
