// Writable Stream P2: copy file

// (1)
const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')

// (2)
const writeStream = createWriteStream('./copy.mp4')

readStream.on('data', (chunk) => {
  // (3)
  writeStream.write(chunk)
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})

readStream.on('end', () => {
  // (4)
  writeStream.end()
})

// (5)
writeStream.on('close', () => {
  process.stdout.write('file copied \n')
})
