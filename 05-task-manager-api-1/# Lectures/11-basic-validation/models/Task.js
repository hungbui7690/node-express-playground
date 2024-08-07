const mongoose = require('mongoose')

// use validations
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'], // custom message
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false, // default value
  },
})

module.exports = mongoose.model('Task', TaskSchema)
