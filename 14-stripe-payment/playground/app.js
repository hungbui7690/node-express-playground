/*
  1. trong controller, đổi tên function thành stripeControler >> vì chúng ta sẽ import stripe >> avoid collision
  2. tạo .env vào bỏ api key cũng như secret vào 
  3. viết controller: 
      - const stripe = require('stripe')(process.env.STRIPE_SECRET) 
        >>> lưu ý: đã từng sai 1 lần >> STRIPE_SECRET chứ ko phải STRIPE_KEY

      - nếu log ra paymentIntent >> có 1 field mà chúng ta cần >>> client_secret: 'pi_3Lu21hCvy5PjRybE0ZV7QKXy_secret_qJQyqUO6CfHMqa945AlCwG6KW', >>> chúng ta muốn gửi lại tới front end
  
  > Note 1: Nhắc lại, ở backend, chúng ta chỉ calculate và compare total (amount) >>> sau đó tạo ra paymentIntent để clientSecret tới frontend
  
  > Note 2: thường chúng ta sẽ calculate total amount >> sẽ lấy ra từ db và calculate >> ko phải ở front end gửi xuống cái gì là chúng ta sử dụng cái đó >>> bởi vì data ở front end rất dễ bị manipulate >>> chúng ta phải lấy ra id ở frontend, communicate với db để lấy ra price >>>  calculate ở backend rồi compare >> vì đây là demo project, nên ko có connect db 

  > Note 3: nhập thẻ vào thì MM/YY phải ở tương lai, zip code phải là 5 số 

  >>>>>> nếu thành công >>> vào Dashboard >>> Payments để thấy payments (Developers)

  Web đẹp:
  https://scottshop.netlify.app/store 


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// controller
const stripeController = require('./controllers/stripeController')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public'))

// stripe
app.post('/stripe', stripeController)

// error
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// ======================================
// SERVER & PORT
// ======================================

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
