// Writable Stream: high water mark
// - check pic: overflow
// - back pressure: whenever we have the hose (pipe)
// - high water mark: how much water the hose can handle

const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')

// (***)
const writeStream = createWriteStream('./copy.mp4', { highWaterMark: 1234567 }) // more memory intensive

readStream.on('data', (chunk) => {
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

writeStream.on('drain', () => {
  console.log('drained')
  readStream.resume()
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n')
})
