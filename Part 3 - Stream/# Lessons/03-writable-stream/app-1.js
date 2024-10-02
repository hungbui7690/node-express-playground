// Writable Stream P1: Initial Setup
// everywhere:
// - http req, res
// - write data to file system...
// - log, error...

const { createReadStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')

readStream.on('data', (chunk) => {
  console.log(`> Little Chunk ${chunk.length} : `, chunk)
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})

readStream.on('end', () => {
  console.log('[][] Read Stream Ended')
})
