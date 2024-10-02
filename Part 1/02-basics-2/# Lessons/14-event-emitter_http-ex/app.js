/*
  Docs >> HTTP >> http.server >> Event 'request'

*/

const http = require('http')

// Using EventEmitter API
// emits 'request' event >> this will happen bts
const server = http.createServer()

// subscribe to it / listen to it / response to it
server.on('request', (req, res) => {
  res.end('Welcome')
})

server.listen(5000)
