/*
  - Though async is ok, but with below ex: code will be messy very fast (callback hell) when we use callback approach 

*/

const { readFile, writeFile } = require('fs')

console.log('==== Start ====')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result

  readFile('./content/second.txt', 'utf-8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result

    writeFile(
      './content/result-async.txt',
      `Here is the new result: ${first} ${second}`,
      { flag: 'a' },
      (err, result) => {
        console.log('*** Done with this task ***')
      }
    )
  })
})

console.log('==== Starting Next Task ====')
