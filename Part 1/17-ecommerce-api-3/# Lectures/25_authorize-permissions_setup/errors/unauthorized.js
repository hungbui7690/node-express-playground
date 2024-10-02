const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api')

// 3. errors/index.js
class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}

module.exports = UnauthorizedError
