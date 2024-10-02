// PIPE, DUPLEX & TRANSFORM STREAMS
const { createWriteStream } = require('fs')
const writeStream = createWriteStream('./test.txt')

// from input to file
// echo "hello world" | node .\app.js
// cat .\app.js | node .\app.js
process.stdin.pipe(writeStream)
