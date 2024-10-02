/*
  Node JS 
  - environment to run JS outside browser
  - built on top of Chrome's V8 JS Engine
  - big community >> easy to find help, also has a lot of modules/packages to reuse


***********************

  BROWSER vs SERVER
  - Browser:
    - DOM
    - window
    - Use to build Interactive Apps
    - No Filesystem
      - Fragmentation
      - ES6 Modules
  
  - Node.js
    - NO DOM
    - No window >>> no access to browser APIs
    - Use to build Server Side Apps
    - Filesystem
    - Server:
      + In JS, we can write code that browser can run >> but sometimes, it cannot run if different browsers
      + But with NodeJS, this is not the problem because NodeJS is Version App
    - CommonJS: this is the module that NodeJS uses, similar to JS when using ES6 module
    

***********************

  GLOBAL - NO WINDOW !!!
    __dirname    - Path to current directory
    __filename   - File name (abs path)
    require      - function to use modules (CommonJS)
    module       - info about current module (file)
    process      - info about env where the program is being executed

  - to run the app
    + node app.js
    + node app

*/

console.log('__dirname :>> ', __dirname)
console.log('__filename :>> ', __filename)

setInterval(() => {
  console.log(`Hello World`)
}, 5000)
