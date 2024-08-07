/*
  - Tasks will be run from top to bottom >> Assume that we read 2 files (first.txt & second.txt) that takes a long time 
    + then the 3rd won't be run until the 1st 2 files finishes 

  - in the real world, this will block other users from accessing to files or tasks

*/

const { readFileSync, writeFileSync } = require('fs')

// (1)
console.log('==== Start ====')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
console.log('first :>> ', first)
console.log('second :>> ', second)

// (2)
writeFileSync(
  './content/result1.txt',
  `
  Here is the new result: 
  ${first} 
  ${second}
  `
)

// (3)
writeFileSync('./content/result2.txt', `${first} ${second} append`, {
  flag: 'a',
})

// (4)
console.log('*** Done with this Task ***')
console.log('==== Starting the next one ====')
