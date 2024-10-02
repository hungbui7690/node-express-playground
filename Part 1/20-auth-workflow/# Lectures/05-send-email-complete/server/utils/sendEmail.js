const nodemailer = require('nodemailer')

// (2a)
const nodemailerConfig = require('./nodemailerConfig')

// (3a)
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount()

  // (2b)
  const transporter = nodemailer.createTransport(nodemailerConfig)

  // (3b) sang utils/sendVerificationEmail.js
  let info = await transporter.sendMail({
    from: '"Auth Workflow 👻" <auth-workflow@example.com>',
    to,
    subject,
    html,
  })
}

module.exports = sendEmail
