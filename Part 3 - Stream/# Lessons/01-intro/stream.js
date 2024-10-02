const fs = require('fs')
const http = require('http')
const file = './Funny Cat.mp4'

/*
  - No peek 
  - Data is sent bits by bits continuously 
  > less Mark-sweep, more Scavenge 
*/

const server = http.createServer((req, res) => {
  res.writeHeader(200, {
    'Content-Type': 'video/mp4',
  })

  // create stream > create pipe to destination (res = browser)
  fs.createReadStream(file).pipe(res).on('error', console.error)
})

server.listen(3000, () => console.log('stream - http://localhost:3000'))
