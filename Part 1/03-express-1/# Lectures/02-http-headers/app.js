/*
  HTTP Headers
  - res.writeHead(statusCode, header)

  - res.end(`<h1>Home Page</h1>`)
    > this is similar to below 2 lines
      + res.write(`<h1>Home Page</h1>`)
      + res.end()

  - res.writeHead(200, { 'content-type': 'text/html' }) 
  - res.writeHead(200, { 'content-type': 'text/plain' })
    > text/html or text/plain which is called MIME Type (media type) 
    > check MDN status Code / mime types
  
  - we don't want to see 4xx (Client Err) & 5xx (Server Err)
  - we don't need to remember, but need to know
  - we attach status code so that browser knows about status info 
    > we must send the correct status code

  - about MIME types => don't need to remember because we have package that supports us

*/

const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' }) // send header
  res.end(`<h1>Home Page</h1>`)
})

server.listen(5000)
