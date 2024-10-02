const stripe = require('stripe')(process.env.STRIPE_SECRET)

// const items = [
//   { id: '1', name: 't-shirt', price: 1999 },
//   { id: '2', name: 'shoes', price: 4999 },
// ]
// const total_amount = 10998
// const shipping_fee = 1099

// # From Stripe Docs
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0
  items.forEach((item) => {
    total += item.price
  })
  console.log(total)
  return total
}

const stripeController = async (req, res) => {
  const { items, total_amount, shipping_fee } = req.body // 1. this is from Client

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
  })

  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
