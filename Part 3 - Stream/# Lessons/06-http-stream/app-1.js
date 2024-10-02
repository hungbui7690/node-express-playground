// HTTP Stream P1: Initial Setup

const { createServer } = require('http')
const { createReadStream } = require('fs')
const file = './Funny Cat.mp4'

createServer((req, res) => {}).listen(3000, () =>
  console.log('Server is Running on Port 3000...')
)
