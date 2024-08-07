// ------- UI helpers -------
// # Code from Stripe Docs -> At the end of checkout.js
function showMessage(messageText) {
  const messageContainer = document.querySelector('#payment-message')

  messageContainer.classList.remove('hidden')
  messageContainer.textContent = messageText

  setTimeout(function () {
    messageContainer.classList.add('hidden')
    messageContainer.textContent = ''
  }, 4000)
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('#submit').disabled = true
    document.querySelector('#spinner').classList.remove('hidden')
    document.querySelector('#button-text').classList.add('hidden')
  } else {
    document.querySelector('#submit').disabled = false
    document.querySelector('#spinner').classList.add('hidden')
    document.querySelector('#button-text').classList.remove('hidden')
  }
}
