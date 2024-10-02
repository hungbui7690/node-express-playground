// HTTP Stream P5: create routes with Express

const express = require('express')
const app = express()
const { stat, createReadStream, createWriteStream } = require('fs')
const { promisify } = require('util')
const file = './Funny Cat.mp4'
const fileInfo = promisify(stat)

app.use(express.urlencoded({ extended: false }))

// (1)
const sendVideo = async (req, res) => {
  const { size } = await fileInfo(file)
  const range = req.headers.range

  if (range) {
    let [start, end] = range.replace(/bytes=/, '').split('-')
    start = parseInt(start, 10)
    end = end ? parseInt(end, 10) : size - 1

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4',
    })
    createReadStream(file, { start, end }).pipe(res)
  } else {
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': size,
    })
    createReadStream(file).pipe(res)
  }
}

// (2)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\index.html')
})

// (3)
app.get('/video', (req, res) => {
  sendVideo(req, res)
})

// (4) handle form submission
// (***) problem: always show ------WebKitFormBoundaryOsqd4Qva6NQFMI5B--
app.post('/', (req, res) => {
  req.pipe(res) // display in browser
  req.pipe(process.stdout) // display in console
  req.pipe(createWriteStream('./uploaded.txt')) // save file
})

app.listen(3000, () => console.log('Server is Running on Port 3000...'))
