const fs = require('fs')
const http = require('http')
const file = './test.mp4'

/*
  (1) node --trace_gc .\buffer.js > trace garbage collector
  (2) open Resource Monitor (windows 10) > track in memory tab 
  (3) go to localhost:3000 > open 5 of tabs > 5 videos & see the changes
  > pic: buffer-test > we will see the peek in Resource Monitor > that happens when it's in the Buffer Zone
  > also, we have more Mark-sweep (may stop nodejs) than Scavenge (lighter version of Mark-Sweep)

*/

const server = http.createServer((req, res) => {
  fs.readFile(file, (error, data) => {
    if (error) {
      console.log('hmmm', error)
    }

    res.writeHeader(200, {
      'Content-Type': 'video/mp4',
    })
    res.end(data)
  })
})

server.listen(3000, () => console.log('buffer - http://localhost:3000'))
