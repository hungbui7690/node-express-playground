// This is fake data -> This data should come from the Form
// The items the customer wants to buy
const items = [
  { id: '1', name: 't-shirt', price: 1999 },
  { id: '2', name: 'shoes', price: 4999 },
]
const total_amount = 10998
const shipping_fee = 1099

// 1. Paste API Key here
var stripe = Stripe(
  'pk_test_51MEs4jGLxgdk9T5YdiSFEiSOZaDIwby7SLIkrilmzjnID9lwM0tzzoLcaPfBoLEPa8HzAhKn6MnhHOLPxE0mZm18007gDeyhrA'
)

// 2. Disable the button until we have Stripe set up on the page
document.querySelector('button').disabled = true

// 3. send data from front end to backend
fetch('/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ items, total_amount, shipping_fee }),
})
  .then(function (result) {
    return result.json()
  })
  .then(function (data) {
    // # Code from Stripe Docs -> Initialize Function
    var elements = stripe.elements()
    var style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
    var card = elements.create('card', { style: style })
    // Stripe injects an iframe into the DOM
    card.mount('#card-element')

    card.on('change', function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector('button').disabled = event.empty
      document.querySelector('#card-error').textContent = event.error
        ? event.error.message
        : ''
    })

    // 4b. nodeJS server will response "data" with clientSecret
    var form = document.getElementById('payment-form')
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      // Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.clientSecret)
    })
  })

// 4a. Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true)
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message)
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id)
      }
    })
}
