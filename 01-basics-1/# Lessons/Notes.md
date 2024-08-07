# Run the App

- Navigate to the folder
- node app.js

# NodeJS

- environment to run JS outside browser
- built on top of Chrome's V8 JS Engine
- big community >>> easy to find help, also has a lot of modules/packages to reuse

# Browser vs Server

> > Browser:

- DOM
- window
- Use to build Interactive Apps
- No Filesystem
- Fragmentation
- ES6 Modules

> > Node.js

- NO DOM
- No window >>> no access to browser APIs
- Use to build Server Side Apps
- Filesystem
- Version >> nếu ở JS, chúng ta viết code mà ở Browser chúng ta chạy đc, nhưng ở User ko chạy đc >> chúng ta phải fix >>> nhưng ở NodeJS thì ko có chuyện đó vì NodeJS là Version app >> ko cần phải update
- CommonJS >> NodeJS sử dụng module này, khá giống với JS sử dụng ES6 module

# REPL, CLI

- REPL = Read Eval, Print Loop
- CLI executable: running our app code in Node

- Để vào REPL >> vào terminal >> node

# Built in Modules

- OS
- Path
- FS
- HTTP

# HTTP

- bài này chúng ta sẽ học sơ về HTTP
- sẽ học kỹ ở chương tiếp theo

# NPM Info

> > npmjs.com >> code store

- khi chúng ta cài Node, chúng ta đồng thời đã cài NPM, giúp chúng ta:

* reuse our old codes
* use codes written by other devs
* share our own solution with other devs as well
  > > check weekly downloads
