/*
  NodeMailer - Ethereal
  - send email in NodeJS is straightforward 
    -> because NodeJS has NodeMailer -> do all heavy lifting stuffs 

  - https://nodemailer.com/
    -> scroll down to example -> we need to have transporter

***********************

  - to test -> we need to use Ethereal or MailTrap
  - production -> SendGrid or MailGun


  1. in this project, we will use Ethereal -> create account very fast 
    - https://ethereal.email/

  2. after create Ethereal account -> scroll down -> Nodemailer configuration

      const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'lawson.witting15@ethereal.email',
              pass: 'QErz6ccuhEfyF86k9N'
          }
      });

  3. production -> just need to change host, user & password -> typically, we setup these info in .env

**************************

  Send Email with Ethereal
  
  1. https://nodemailer.com/ -> example
  2. controller
  3. browser -> send email
  4. ethereal -> open mail box

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const sendEmail = require('./controllers/sendEmail')

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1><a href="/send">Send Email<a>')
})

// send Email
app.get('/send', sendEmail)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//////////////////
// SERVER & PORT
//////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
