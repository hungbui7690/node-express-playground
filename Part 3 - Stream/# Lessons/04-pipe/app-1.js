// PIPE, DUPLEX & TRANSFORM STREAMS
const { createReadStream, createWriteStream, write } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')
const writeStream = createWriteStream('./copy.mp4')

// pipe() will:
// - create all the pipe between those 2 streams
// - also handle back pressure for us
// - we just need to handle error
readStream.pipe(writeStream).on('error', console.error)
