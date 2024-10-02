/*
  > https://www.digitalocean.com/community/tutorials/using-event-emitters-in-node-js#prerequisites

*/

const TicketManager = require('./ticketManager') // (3)

const ticketManager = new TicketManager(10) // (4)

// (5) To add a new listener, we used the on() function that’s a part of the ticketManager object. The on() method is available to all event emitter objects, and since TicketManager inherits from the EventEmitter class, this method is available on all of the TicketManager instance objects.
ticketManager.on('buy', () => {
  console.log('Someone bought a ticket!')
})

ticketManager.buy('test@email.com', 20) // (6)
ticketManager.buy('test@email.com', 20)
