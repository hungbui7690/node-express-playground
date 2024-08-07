const CustomError = require('../errors')

const checkPermissions = (requestUser, resourceUserID) => {
  // console.log(requestUser) // peter
  // console.log(resourceUserID) // mary
  // console.log(typeof resourceUserID) // type = object

  if (requestUser.role === 'admin') return

  if (requestUser.userID === resourceUserID.toString()) return

  throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermissions
