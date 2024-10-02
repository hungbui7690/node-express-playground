/*
  This is the diff between Sync & Async:
  - with Async, when we start, it will offload (send to browser) async task, and run the next one 
    + our app will serve the next one right away

  - but if we use callback like this, our code will be messy >> so, we will use promise in the next lessons

*/

const { readFile, writeFile } = require('fs')

console.log('==== Start ====')

// nested => run in order
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
