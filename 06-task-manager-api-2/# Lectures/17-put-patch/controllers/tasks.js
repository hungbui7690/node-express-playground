const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
    // res.status(200).json({ tasks, amount: tasks.length })
    // res.status(200).json({ tasks, nbHits: tasks.length })
    // res.status(200).json({ success: true, data: { tasks } })
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

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })

    res.status(200).json({ task: null, success: 'success' })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
    res.json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

// PUT -> copy from updateTask() -> add overwrite -> same as above, but with overwrite: true -> now, we can go to Postman to test
const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // *** add this line
    })
    if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` })
    res.json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}
