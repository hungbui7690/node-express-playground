/*
  - in this lesson, we don't use index.html file, but use in navbar-app/
    > when we run, there's no logo, no buttons, no styles
    > in network tab, there are many 404 
      + if we check, we will see /styles.css, /logo.sgv...
      + this is the links are needed in index.html 
        > except the font awesome is the external resources (because it uses cnd)
        > the others links are relative path, so they all send requests to our server 
          # but in our server, we haven't handled these
          # we just handled /, /about, 404

*/

const http = require('http')
const { readFileSync } = require('fs')

// load index.html
const homePage = readFileSync('./navbar-app/index.html')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)

  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(homePage) // check log or network tab, we will see many errors
  }
  if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    return res.end(`<h1>About Page</h1>`)
  }
  res.writeHead(404, { 'content-type': 'text/html' })
  return res.end(`<h1>404: Page Not Found</h1>`)
})

server.listen(5000)
