/*
  Request Object
  - req.method
  - req.url

  *** must have right status code -> 404 at default page

*/

const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(`<h1>Home Page</h1>`)
  }
  if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(`<h1>About Page</h1>`)
  }

  // *** 404
  res.writeHead(404, { 'content-type': 'text/html' })
  return res.end(`<h1>404: Page Not Found</h1>`)
})

server.listen(5000)
