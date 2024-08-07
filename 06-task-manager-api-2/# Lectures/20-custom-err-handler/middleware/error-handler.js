// similar to https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: err })
}

module.exports = errorHandlerMiddleware
