// (4)
const sendEmail = require('./sendEmail')

/*
 (5) origin: đây là url mà chúng ta muốn redirect user sang khi click vào link >> http://localhost:3000
 >> chúng ta sẽ setup URL làm sao để match với front end 
*/
const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  // (a) link này phải có ở front end
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

  // (b)
  const message = `
  <p>
   Please confirm your email by clicking on the following link: 
   <a href="${verifyEmail}">Verify Email</a> 
  </p>

 `
  // (c)
  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `
    <h4>Hello, ${name}</h4>
    ${message}
  `,
  })
}

// (6) sang index.js
module.exports = sendVerificationEmail
