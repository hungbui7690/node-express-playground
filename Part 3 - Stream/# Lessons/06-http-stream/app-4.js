// HTTP Stream P4: handle range in headers

const http = require('http')
const { stat, createReadStream } = require('fs')
const { promisify } = require('util')
const file = './Funny Cat.mp4'
const fileInfo = promisify(stat)

/*
  The problem now is we cannot skip to the end of the video 
*/
const server = http.createServer(async (req, res) => {
  const { size } = await fileInfo(file)

  // (1) bytes=0- > from 0 to ...
  const range = req.headers.range
  console.log(range)

  // (2) handle range
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
  if (range) {
    // (a)
    let [start, end] = range.replace(/bytes=/, '').split('-')
    start = parseInt(start, 10)
    end = end ? parseInt(end, 10) : size - 1

    // (b)
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4',
    })

    // (c)
    createReadStream(file, { start, end }).pipe(res)
  } else {
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': size,
    })

    createReadStream(file).pipe(res)
  }
})

server.listen(3000, () => console.log('Server is Running on Port 3000...'))
