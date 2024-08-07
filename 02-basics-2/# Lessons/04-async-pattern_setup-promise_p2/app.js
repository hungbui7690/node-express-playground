/*
  Promise
  - nesting makes our code messy 
    > so that, we need to use "Promise"

*/

const { readFile } = require('fs')

// (1)
const getText = (path) => {
  // (a)
  return new Promise((resolve, reject) => {
    // (b)
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

getText('./content/first.txt') // (2)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
