// HTTP Stream P3: send info to browser

const http = require('http')

// (1)
const { stat, createReadStream } = require('fs')
const { promisify } = require('util')

const file = './Funny Cat.mp4'

// (2)
const fileInfo = promisify(stat)

const server = http.createServer(async (req, res) => {
  // (3)
  const { size } = await fileInfo(file)

  // (4) we can send this info to browser > check network tab
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': size,
  })

  createReadStream(file).pipe(res)
})

server.listen(3000, () => console.log('Server is Running on Port 3000...'))
