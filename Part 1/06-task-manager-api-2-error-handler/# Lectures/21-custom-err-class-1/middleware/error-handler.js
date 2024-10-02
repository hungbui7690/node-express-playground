const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err) // error will be displayed here

  return res.status(err.status).json({ msg: err.message }) // log out error message
}

module.exports = errorHandlerMiddleware
