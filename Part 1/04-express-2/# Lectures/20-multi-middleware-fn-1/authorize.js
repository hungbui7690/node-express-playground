const authorize = (req, res, next) => {
  const { user } = req.query

  if (user === 'john') {
    req.user = { name: 'john', id: 3 } // save user to request object when "user" is john
    next()
  } else {
    return res.status(401).send('Unauthorized')
  }
}

module.exports = authorize // app.js
