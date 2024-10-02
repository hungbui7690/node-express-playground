// Readable Stream P4: how to use

const fs = require('fs')
const readStream = fs.createReadStream('./Funny Cat.mp4')

readStream.on('data', (chunk) => {
  console.log(`> Little Chunk ${chunk.length} : `, chunk)
})

readStream.on('end', () => {
  console.log('[][] Read Stream Ended')
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})
