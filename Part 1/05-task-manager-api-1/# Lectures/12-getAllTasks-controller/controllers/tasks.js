const Task = require('../models/Task')

// ***
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}) // find all tasks

    return res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
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
