/*
  - run file >> go to network tab >> refresh >> will receive the whole file >> Big Content-Length

*/

const http = require('http')
const { readFileSync } = require('fs')

const server = http
  .createServer((req, res) => {
    const text = readFileSync('./content/big.txt', 'utf-8')
    res.end(text)
  })
  .listen(5000)
