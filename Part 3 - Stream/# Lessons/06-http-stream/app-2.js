// HTTP Stream P2: send video to browser

const http = require('http')
const { createReadStream } = require('fs')
const file = './Funny Cat.mp4'

const server = http.createServer((req, res) => {
  // (1)
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
  })

  // (2)
  createReadStream(file).pipe(res)
})

server.listen(3000, () => console.log('Server is Running on Port 3000...'))
