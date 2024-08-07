const nodemailer = require('nodemailer')

// (0)  check pictures để xem cách setup (pic email-setup 1 - 4)
const sendEmail = async () => {
  // (a)
  let testAccount = await nodemailer.createTestAccount()

  // (b)
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'nina.anderson98@ethereal.email',
      pass: 'ymyKW72w7FxkKJbUhD',
    },
  })

  // (c)
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Verification Email</b>', // html body
  })
}

// (1) sang authController vào import
module.exports = sendEmail
