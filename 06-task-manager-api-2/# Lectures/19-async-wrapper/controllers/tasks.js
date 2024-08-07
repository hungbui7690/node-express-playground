const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

// (a) use asyncWrapper at every functions below -> now, we don't have to use try-catch anymore
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json(tasks)
})

// (b)
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

// (c)
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
  res.status(200).json(task)
})

// (d)
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })

  res.status(200).json({ task: null, success: 'success' })
})

// (e)
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
  res.json({ task })
})

// (f)
const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  })
  if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
  res.json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}
