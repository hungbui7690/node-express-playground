/*
  - to fix the err, we use readFileSync() for all the 404 error
  - we fixed the errs from prev lesson => but our code becomes messy 
    > this is the reason why we use express

*/

const http = require('http')
const { readFileSync } = require('fs')

// load all files (css, logo, js)
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)

  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(homePage) // use here
  }
  if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(`<h1>About Page</h1>`)
  }

  if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' }) // header is different
    return res.end(homeStyles)
  }

  if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' }) // header is different
    return res.end(homeImage)
  }

  if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    return res.end(homeLogic)
  }

  res.writeHead(404, { 'content-type': 'text/html' })
  return res.end(`<h1>404: Page Not Found</h1>`)
})

server.listen(5000)
