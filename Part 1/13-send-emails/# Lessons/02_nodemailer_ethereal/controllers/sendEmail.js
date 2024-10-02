const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
  // 1. create account
  let testAccount = await nodemailer.createTestAccount()

  // 2. create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'everett72@ethereal.email',
      pass: 'hsfpb3bGbGJ6sWP7ZZ',
    },
  })

  // 3. send email -> open ethereal to test
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <hungbui7690@gmail.com>',
    to: 'bar@example.com', // this email will be sent to Ethereal
    subject: 'Hello ✔',
    html: '<b>Sending Email with NodeJS</b>',
  })

  res.json({ info })
}

module.exports = sendEmail
