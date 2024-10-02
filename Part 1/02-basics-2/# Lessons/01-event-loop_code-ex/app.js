/*
  - listen() stays alive 
    > because listen() is async >> event loop will wait for request coming >> then callback will be run

*/

const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hello World')
})

server.listen(5000, () => {
  console.log(`Server is listening on port 5000 ...`)
})
