/*
  - now it is ok >> but problem will appear when we read multiple files in order

*/

const { readFile } = require('fs')

readFile('./content/first.txt', 'utf8', (err, data) => {
  if (err) return

  console.log(data)
})
