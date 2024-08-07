const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end('Home Page')

  if (req.url === '/about') {
    // *** this takes a lot of time to run >> BLOCKING CODE !!!!! >> this is why we prefer async code
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`)
      }
    }
  }

  return res.end('Error Page')
})

server.listen(5000, console.log('Running...'))
