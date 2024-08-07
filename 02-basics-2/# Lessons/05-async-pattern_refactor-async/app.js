/*
  getText() becomes messy

*/

const { readFile } = require('fs')

// (1)
const getText = async (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

// (2)
const start = async () => {
  try {
    const first = await getText('./content/first.txt')
    const second = await getText('./content/second.txt')
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()
