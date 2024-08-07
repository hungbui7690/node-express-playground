// local variable: we don't want to share this to other files
const secret = 'SUPER SECRET'

// we want to share this share
const john = 'john'
const peter = 'peter'

// return an object, which contains export{}
console.log(module)

// (1) go to utils.js
module.exports = { john, peter } // ES6 >> shorthand for module.exports = { john : john, peter : peter }
