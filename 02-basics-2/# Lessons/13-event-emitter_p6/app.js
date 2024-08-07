/*

  > https://www.digitalocean.com/community/tutorials/using-event-emitters-in-node-js#prerequisites

*/

const TicketManager = require('./ticketManager')

const ticketManager = new TicketManager(10)

ticketManager.on('buy', () => {
  console.log('Someone bought a ticket!')
})

ticketManager.buy('test@email.com', 20)
ticketManager.buy('test@email.com', 20)

// (1) Under the hood, when the event is emitted and received by a listener that uses once(), Node.js automatically removes the listener and then executes the code in the callback function.
ticketManager.once('buy', () => {
  console.log('This is only called once')
})

// (2) có thể thấy khi gọi buy() >>> sẽ gọi emit >> chúng ta thấy thằng once() chỉ bị chạy 1 lần duy nhất
ticketManager.buy('test@email.com', 20)
ticketManager.buy('test@email.com', 20)
