/*
  - default = 64kb
  - last buffer is the remainder
  - highWaterMark: control size

  >> besides, there is 'error' event >> run when wrong path
  
*/

const { createReadStream } = require('fs')

// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('./content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8',
})

stream.on('data', (result) => {
  console.log(result)
})

stream.on('error', (err) => {
  console.log(err)
})
