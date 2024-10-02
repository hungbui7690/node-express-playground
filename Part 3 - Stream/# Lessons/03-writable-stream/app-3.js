// Write Stream P3: back pressure
// - check pic: overflow
// - back pressure: whenever we have the hose (pipe)
// - high water mark: how much water the hose can handle

const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')
const writeStream = createWriteStream('./copy.mp4')

readStream.on('data', (chunk) => {
  // (1) return true/false > hose is full or not
  const result = writeStream.write(chunk)

  if (!result) {
    console.log('back pressure')
    readStream.pause()
  }
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})

readStream.on('end', () => {
  writeStream.end()
})

// (2)
writeStream.on('drain', () => {
  console.log('drained')
  readStream.resume()
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n')
})
