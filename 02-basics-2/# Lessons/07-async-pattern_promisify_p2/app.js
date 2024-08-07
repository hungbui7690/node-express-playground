/*
  Method 2: call .promises
  > now, we don't need to change the name, we just need to use async/await directly >> from now on, we will use this method

*/

// (1) call directly
const { readFile, writeFile } = require('fs').promises // with this, readFile & writeFile return promises

const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf8') // (2) need to use async/await (promise)
    const second = await readFile('./content/second.txt', 'utf8')

    // (3)
    await writeFile(
      './content/result-pro.txt',
      `THIS IS MIND-GRENADE: ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()
