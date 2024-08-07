/*
  - when we use readFile() and readFileSync() >> we read and save into variable >> but if file is big: 
    + cost a lot of memory
    + we will face err if file is big >> cannot save into variable because there's not enough space (string)

  - solution: use "streams"

  //////////////////////////////////////////////////////

  - Using streams to process smaller chunks of data, makes it possible to read larger files.

  - Let’s take a “streaming” services such as YouTube or Netflix for example: these services don’t make you download the video and audio feed all at once. 
    > Instead, your browser receives the video as a continuous flow of chunks, allowing the recipients to start watching and/or listening almost immediately.

  - Streams basically provide two major advantages compared to other data handling methods:

  - Memory efficiency: 
    > you don’t need to load large amounts of data in memory before you are able to process it

  - Time efficiency: 
    > it takes significantly less time to start processing data as soon as you have it, rather than having to wait with processing until the entire payload has been transmitted

  //////////////////////////////////////////////////////

  There are 4 types of streams in Node.js:
  - Writable: streams to which we can write data. 
    > For example, fs.createWriteStream() lets us write data to a file using streams.

  - Readable: streams from which data can be read. 
    > For example: fs.createReadStream() lets us read the contents of a file.

  - Duplex: streams that are both Readable and Writable. 
    > For example, net.Socket

  - Transform: streams that can modify or transform the data as it is written and read. 
    > For example, in the instance of file-compression, you can write compressed data and read decompressed data to and from a file.

  >> If you have already worked with Node.js, you may have come across streams. 
    > For example, in a Node.js based HTTP server, request is a readable stream and response is a writable stream. 
    > You might have used the fs module, which lets you work with both readable and writable file streams. 
    > Whenever you’re using Express you are using streams to interact with the client, also, streams are being used in every database connection driver that you can work with, because of TCP sockets, TLS stack and other connections are all based on Node.js streams

//////////////////////////////////////////////////////

  (1) chạy file create-big-file.js để tạo ra big file

  - ban đầu, nếu log ra result sẽ trả về chunks of data (stream) 
    > mỗi chunk là 64kb

  - Docs >> Class: fs.ReadStream >> Event: 'close', Event: 'open', Event: 'ready' (học sau)
  
  - Instances of <fs.ReadStream> are created and returned using the fs.createReadStream() function. 
    > Extends: <stream.Readable> >> vào đây sẽ thấy Event 'data'
  
*/

const { createReadStream } = require('fs')

const stream = createReadStream('./content/big.txt')

stream.on('data', (result) => {
  console.log(result)
})
