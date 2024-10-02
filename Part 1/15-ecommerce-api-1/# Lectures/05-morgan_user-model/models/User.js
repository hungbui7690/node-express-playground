const mongoose = require('mongoose')
const validator = require('validator') // 1.

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, 'Please provide email'],

    /* 
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }*/
    // 2.
    validate: {
      validator: validator.isEmail,
      message: 'Email format is not valid',
    },
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

module.exports = mongoose.model('User', UserSchema)
