// Stream: Readable Stream P5: non-flowing mode

const fs = require('fs')
const readStream = fs.createReadStream('./Funny Cat.mp4')

// Convert to non-flowing stream
// (1)
readStream.on('data', (chunk) => {
  console.log(`> Little Chunk ${chunk.length} : `, chunk)
})

readStream.on('end', () => {
  console.log('[][] Read Stream Ended')
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})

// (2)
readStream.pause()

// (3)
process.stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'q') readStream.resume()
  readStream.read()
})
