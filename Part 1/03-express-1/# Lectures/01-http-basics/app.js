/*
  HTTP Basics
  - Why we can access to req & res in createServer() 
    + because in the prev lesson, we learn about HTTP Cycle (Notes.md), which has req and res

  - PORT: communication endpoint (check wiki)
    + 20: File Transfer Protocol (FTP) 
    + 443: HTTP Secure (HTTPS) HTTP over TLS/SSL
      > check remote address in Network tab
      > now, we can use port 5000 >> but in the prod server, it is not 5000, but depends on each situation

  - res.end(): 
    + will end the res process 
    + signal to server that all the response headers and body have been sent 
    + must be called on each response
    
  - now, if we go to / or /about... >> we receive the same response
  - besides, we don't provide any info about data that we send out
    + next lesson
*/

const http = require('http')

const server = http.createServer((req, res) => {
  console.log('user hit server')

  res.end('Home Page') // must have res.end() => otherwise, it will be hang when we send requests to server
})

server.listen(5000)
