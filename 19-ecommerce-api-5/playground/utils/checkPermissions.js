const CustomError = require('../errors')

// 2. userController
const checkPermissions = (requestUser, resourceUserID) => {
  // console.log(requestUser) // peter
  // console.log(resourceUserID) // mary
  // console.log(typeof resourceUserID) // type = object

  // a. Case 1
  if (requestUser.role === 'admin') return

  // b. Case 2
  if (requestUser.userID === resourceUserID.toString()) return

  // c. Case 3
  throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermissions
