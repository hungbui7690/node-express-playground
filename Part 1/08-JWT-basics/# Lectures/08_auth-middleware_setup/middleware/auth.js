const authenticationMiddleware = async (req, res, next) => {
  console.log('req.headers.authorization: ', req.headers.authorization)

  next()
}

module.exports = authenticationMiddleware // routes/main.js
