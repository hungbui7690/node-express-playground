/*
  - we can listen to multiple events with the same name at the same time

  - note: 
    > order is important >> if we place emit() before on() >> it won't work 
    > can pass args to emit(), and we can use at .on()

*/

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.on('response', (code, msg) => {
  console.log(`Got ${code} and ${msg}`) // (1a)
})

customEmitter.on('response', () => {
  console.log(`some other logic`) // (1b)
})

customEmitter.emit('response', 200, 'ok') // (2) now, we can receive 2 callback functions in .on() above

console.log(customEmitter.listenerCount('response')) // (3) Getting Listener count
