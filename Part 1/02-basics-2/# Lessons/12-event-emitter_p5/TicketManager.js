const EventEmitter = require('events')

// (1)
class TicketManager extends EventEmitter {
  // (a)
  constructor(supply) {
    super()
    this.supply = supply // This is a number detailing the initial supply of tickets we can sell
  }

  // (b) In the buy() function, we take the purchaser’s email address and the price they paid for the ticket. We then decrease the supply of tickets by one. We end by emitting a buy event. This time, we emit an event with extra data: the email and price that were passed in the function as well as a timestamp of when the purchase was made.
  buy(email, price) {
    this.supply--
    this.emit('buy', email, price, Date.now())
  }
}

module.exports = TicketManager // (2) to app.js
