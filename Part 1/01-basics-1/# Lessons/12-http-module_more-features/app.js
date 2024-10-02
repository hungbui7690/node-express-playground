/*
  req object: 
  - req.url

*/

const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end('Welcome to our Homepage') // homepage

  if (req.url === '/about') return res.end('Here is our short history') // /about

  // error page
  return res.end(`
    <h1>Ops!</h1>
    <p>We can't seem to find the page that you are looking for</p>
  `)
})

server.listen(5000, console.log(`Server is running...`))
