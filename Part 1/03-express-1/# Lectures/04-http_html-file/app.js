/*
  HTTP - HTML File
  - Why do we use readFileSync(), but not readFile()
    + we don't run this method everytime receive request 
      > it just run ONCE when instantiate our server

*/

const http = require('http')
const { readFileSync } = require('fs')

// read Html File
const homePage = readFileSync('./index.html')

const server = http.createServer((req, res) => {
  const url = req.url

  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(homePage) // *** use here  now, homepage will be loaded from html file
  }
  if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(`<h1>About Page</h1>`)
  }
  res.writeHead(404, { 'content-type': 'text/html' })
  return res.end(`<h1>404: Page Not Found</h1>`)
})

server.listen(5000)
