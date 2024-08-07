/*
  HTTP Module 
  - now, if we go to localhost:5000/about >> the result will be same with localhost:5000/

*/

const http = require('http')

// create server with createServer(cb) => must have res.end(), otherwise it will hang
const server = http.createServer((req, res) => {
  res.write('Welcome to our Homepage')
  res.end()
})

server.listen(5000, console.log(`Server is running...`)) // listen(post, cb)
