/*
  FS Module
  - readFileSync(path, encoding)
    + encoding = utf-8

  - write:
    + writeFileSync(path, text)
      > overwrite everything
    + writeFileSync(path, text, {flag: 'a'})
      > 'a' === append

*/

const { readFileSync, writeFileSync } = require('fs') // (1)

const first = readFileSync('./content/first.txt', 'utf8') // (2) readFileSync
const second = readFileSync('./content/second.txt', 'utf8')
console.log('first : ', first)
console.log('second : ', second)

// (3) writeFileSync(path, text) >> by default, if file does not exist, then creates new file >> else, overwrite
writeFileSync(
  './content/result1.txt',
  `
  Here is the new result: 
  ${first} 
  ${second}
  `
)

// (4) writeFileSync(path, text, {flag: 'a'}) >> a = append
writeFileSync('./content/result2.txt', `${first} ${second} append`, {
  flag: 'a',
})
