/*
    CommonJS: every file in NODE is module (by default)
    Modules: Encapsulated Code (only share minimum)

    (1) names.js

*/

// save to variable
const names = require('./names') // or we can destruct at the beginning: const { john, peter } = require('./names')
const sayHi = require('./utils')

console.log('names :>> ', names)
console.log(module)

// use
sayHi(names.john)
sayHi(names.peter)
sayHi('susan')
