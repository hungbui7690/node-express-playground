/*
  NPM Commands
    - npm: global command that comes with node
      + npm --version
      + npm --v

    - local dependency: use only in particular project 
      > npm i <packageName>

    - global dependency: use in all projects
      > npm install -g <packageName> 
      >> later, when we know about npx, we will know why we don't want to install packages globally

    bootstrap, lodash...


*************************

- package.json: 
  + manifest file: is a file that list super info for a group of files that link together
    > manual approach: create package.json in the root => then create properties
    > npm init (step by step, press enter to skip)
    > npm init -y (everything default)


*************************

  - node_modules/ => where all dependencies are stored
    - with small packages (like lodash) => it just has 1 package
    - but with bigger packages (like bootstrap) => it must use another dependencies => so, there will be many deps in node_modules/    
*/

const _ = require('lodash')

const arr = [1, 2, [3, 4, [5, 6, [7, 8]]]]
const newArr = _.flattenDeep(arr)
console.log(newArr)
