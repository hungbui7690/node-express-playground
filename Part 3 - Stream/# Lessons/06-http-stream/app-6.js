// HTTP Stream P6: using multiparty package to parse
// (***) to fix this problem, we need to use 3rd party package
// > npm i multiparty

const express = require('express')
const app = express()
const { stat, createReadStream, createWriteStream } = require('fs')
const { promisify } = require('util')

// (1)
const multiparty = require('multiparty')

const file = './Funny Cat.mp4'
const fileInfo = promisify(stat)

app.use(express.urlencoded({ extended: false }))

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\index.html')
})

app.get('/video', (req, res) => {
  sendVideo(req, res)
})

// (2)
app.post('/', (req, res) => {
  let form = new multiparty.Form()

  form.on('part', (part) => {
    // console.log(part)
    part.pipe(createWriteStream(`./copy/${part.file}`)).on('close', () => {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(`<h1>File Uploaded: ${part.filename}</h1>`)
    })
  })

  form.parse(req)
})

app.listen(3000, () => console.log('Server is Running on Port 3000...'))
