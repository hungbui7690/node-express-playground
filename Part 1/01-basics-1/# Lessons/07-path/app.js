/*
  Path

*/

// (1)
const path = require('path')

// (2) separator
console.log('path.sep : ', path.sep)

// (3) normalized path
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log('filePath : ', filePath)

// (4) baseName
const base = path.basename(filePath)
console.log('base : ', base)

// (5) absolute path
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(('__dirname: ', __dirname)) // current path
console.log(('__filename: ', __filename)) // current file
console.log('absolute : ', absolute)
