// PIPE, DUPLEX & TRANSFORM STREAMS
// DUPLEX

// (1) PassThough = most basic of duplex stream
const { PassThrough } = require('stream')

const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')
const writeStream = createWriteStream('./copy.mp4')

// (2)
const report = new PassThrough()

// (4)
let total = 0
report.on('data', (chunk) => {
  total += chunk.length
  console.log('bytes : ', total)
})

// (3) duplex: can be put in between readable and writable
// > can read data from read stream, and send data to write stream
readStream.pipe(report).pipe(writeStream)
