/*
  - util module 
    > there is method which helps to turn readFile() to return promise

*/

const { readFile, writeFile } = require('fs')

const util = require('util') // (1)

const readFilePromise = util.promisify(readFile) // (2) Method 1
const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    const first = await readFilePromise('./content/first.txt', 'utf8') // (3)
    const second = await readFilePromise('./content/second.txt', 'utf8')

    // (4)
    await writeFilePromise(
      './content/result-pro.txt',
      `THIS IS AWESOME: ${first} ${second}`
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()
