const crypto = require('crypto')

// (1) sang authController.js
const hashString = (string) =>
  crypto.createHash('md5').update(string).digest('hex')

module.exports = hashString
