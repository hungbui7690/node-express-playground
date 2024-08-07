/*
  - .off() : Unregistered events
*/

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.off('event', () => console.log('event fired')) // (1)

customEmitter.emit('event') // (2) now, event won't be run because .off() is above

console.log(customEmitter.listenerCount('event')) // (3)
