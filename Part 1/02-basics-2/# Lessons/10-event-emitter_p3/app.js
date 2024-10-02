/*
  - .once() >> fire only once
*/

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.once('runOnce', () => console.log('runOnce fired')) // (1) registering for the event to be fired only one time using once

customEmitter.emit('runOnce') // (2) Emitting the event
