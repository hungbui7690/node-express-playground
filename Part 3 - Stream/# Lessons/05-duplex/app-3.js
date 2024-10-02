// TRANSFORM STREAM: special type of Duplex > can modify data
// (1)
const { Transform } = require('stream')

// (2) hello -> xxxxx
class ReplaceText extends Transform {
  constructor(char) {
    super()
    this.replaceChar = char
  }

  // (***) similar to _write()
  _transform(chunk, encoding, callback) {
    const transformChunk = chunk
      .toString()
      .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar)
    this.push(transformChunk)
    callback()
  }

  // (***) add more to to write stream
  _flush(callback) {
    this.push('more stuff is being passed through')
  }
}

const xStream = new ReplaceText('x')

// process.stdout = console
process.stdin.pipe(xStream).pipe(process.stdout)

/*
  There are a lot of transform stream out there
  - zlib: get the data, compress, and transform to write stream 
  - crypto: get data, then encrypt 
  ...
*/
