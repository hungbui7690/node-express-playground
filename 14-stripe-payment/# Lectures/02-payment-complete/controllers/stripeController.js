const stripe = require('stripe')(process.env.STRIPE_SECRET)

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body
  console.log('abcs')
  // bước này phải lấy id từ front end gửi xuống >> vào db để lấy ra price >> rồi calculate
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })

  // console.log(paymentIntent)

  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
