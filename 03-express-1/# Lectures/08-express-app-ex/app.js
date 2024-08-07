/*
  - copy in /navbar-app into /public 
    + styles.css
    + logo.svg
    + browser-app.js 
  - DO_NOT copy index.html  
    + in /navbar-app, it just has index.html, and in public/ contains all other files

  @@ res.sendFile(path)
    > when we use res.sendFile() below, it still shows errs like prev lessons (missing styles, log, js...)
      + we need to use app.use()

  @@ app.use()
    + use to setup (load) middleware
    ~~ app.use(express.static(pathToFolder))
      > normally, we use this to setup public/ which contains all file styles, or images
      > with this setup, we can use browser to access directly to these files: i.e. localhost:5000/styles.css


  *** all the files in public/ are the ones which are not important that anyone can see and access to
  *** static asset: files that server does not have to change it 

  *** or we can use: 
    ~~ app.use('/static', express.static(logo.svg))
      > localhost:5000/static/logo.svg


*/

const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./public')) // *** setup static & middleware => if we don't have this line, we cannot load files like css, sgv, logo...

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html')) // *** send index.html file
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
