/*
  readFile() will be offloaded >> means that it will be sent to browser to manipulate 

*/

const { readFile, writeFile } = require('fs')

// 1st
console.log('== Start the first task ==')

// 3rd
readFile('./content/first.txt', 'utf-8', (err, data) => {
  if (err) return

  console.log(data)
  console.log('*** Complete First Task ***')
})

// 2nd
console.log('== Start Second Task ==')
