/*
  Return Chunks in Network Tab

*/

const http = require('http')
const fs = require('fs')

const server = http
  .createServer((req, res) => {
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
      fileStream.pipe(res) // write data in chunk
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)
