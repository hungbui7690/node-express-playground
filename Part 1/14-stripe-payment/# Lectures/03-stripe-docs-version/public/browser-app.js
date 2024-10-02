// This is fake data -> This data should come from the Form
// The items the customer wants to buy
const items = [
  { id: '1', name: 't-shirt', price: 1999 },
  { id: '2', name: 'shoes', price: 4999 },
]
const total_amount = 10998
const shipping_fee = 1099

// **********************************
// 1. Paste API Key here
var stripe = Stripe(
  'pk_test_51MEs4jGLxgdk9T5YdiSFEiSOZaDIwby7SLIkrilmzjnID9lwM0tzzoLcaPfBoLEPa8HzAhKn6MnhHOLPxE0mZm18007gDeyhrA'
)

// **********************************
// 2. send data from frontend to backend
// Fetches a payment intent and captures the client secret
let elements
initialize()
async function initialize() {
  const response = await fetch('/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, total_amount, shipping_fee }),
  })

  const { clientSecret } = await response.json()
  console.log(clientSecret)

  const appearance = {
    theme: 'stripe',
  }
  elements = stripe.elements({ appearance, clientSecret })

  const paymentElementOptions = {
    layout: 'tabs',
  }

  const paymentElement = elements.create('payment', paymentElementOptions)
  paymentElement.mount('#payment-element')
}

// **********************************
// 3.
async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: 'http://localhost:5000',
    },
  })

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === 'card_error' || error.type === 'validation_error') {
    showMessage(error.message)
  } else {
    showMessage('An unexpected error occurred.')
  }

  setLoading(false)
}

// **********************************
// 4.
// Fetches the payment intent status after payment submission
checkStatus()
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
  )

  if (!clientSecret) {
    return
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

  switch (paymentIntent.status) {
    case 'succeeded':
      showMessage('Payment succeeded!')
      break
    case 'processing':
      showMessage('Your payment is processing.')
      break
    case 'requires_payment_method':
      showMessage('Your payment was not successful, please try again.')
      break
    default:
      showMessage('Something went wrong.')
      break
  }
}
