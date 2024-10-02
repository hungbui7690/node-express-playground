/*
  EventEmitter là class >> convention: EventEmitter
  - instance of EventEmitter has many methods, but we need to remember 2 of them: 
    + on: listen for an event
      > on(eventName, cb)
    + emit: emit an event

  *** note: 
    + the names of event at .on() and .emit() must match
    + on() must be above emit()
      > otherwise it won't work


  - https://www.tutorialsteacher.com/nodejs/nodejs-eventemitter

*/

const EventEmitter = require('events') // (1) class >> must be capitalized

const customEmitter = new EventEmitter() // (2) create instance

// (3) subscribe for 'response' event >> .on() similar to .addEventListener()
customEmitter.on('response', () => {
  console.log(`data received`)
})

// (4) raise 'response' event
customEmitter.emit('response')
