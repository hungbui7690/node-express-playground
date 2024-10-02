/*
  FS Module - ASYNC 
  - similar to readFileSync() >> but the diff is readFile() receives callback function
    + readFile(path, encoding, CALLBACK)
    + writeFile(path, newText, flag, CALLBACK)

*/

const { readFile, writeFile } = require('fs')

// (1) v1: readFile(path, cb) >> cb will be run when functionality finishes running
readFile('./content/first.txt', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result) // now, we don't receive text, but "buffers" >> because we did not put encoding
})

/*
  (2) v2: readFile(path, encoding, cb)
    + below is the way we read 2 files in order 
    + then write into a new file 
    + but when we use this way, it will creates callback hell
*/
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
        console.log(err, result) // always return undefined when we use "write"
      }
    )
  })
})
