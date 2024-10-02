const getAllTasks = (req, res) => {
  res.send('All items')
}

// create all placeholder for all callbacks => this is because we don't want to miss any functionalities later
const createTask = (req, res) => {
  res.json(req.body)
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

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask } // go to routes/tasks.js
