/*
  - similar to ex1 >> setTimeout() is offload to browser

*/

console.log('== first ==') // 1st

setTimeout(() => {
  console.log('== second ==') // 3rd
}, 0)

// 2nd
console.log('== third ==')
