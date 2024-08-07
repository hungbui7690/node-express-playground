Course Link: https://course-api.com/

https://nodejs.dev/en/learn/

# Topics

- Event Loops, Async Pattern, Events Emitter & Streams
- Main Concepts
- Pre-built Code

## Event Loop Info

- allows Node.js to perform non-blocking I/O operations, despite the fact that JS is single-threaded >> by offloading operations to the system kernel whenever possible
  https://www.youtube.com/watch?v=8aGhZQkoFbQ
  https://www.youtube.com/watch?v=PNa9OMajw9w

## Events

- khi chúng ta work với JS, phần lớn là chúng ta sẽ handle events (click, keyup, DOMContentLoaded, load...) >> that style of programming đc gọi là "Event Driven Programming"
- vậy ở server thì sao? yessss >>> khi có events >> callback funtion sẽ đc chạy
- Use Heavily in Node.js

## Streams

- Writeable >> write data sequentially
- Readable

  > > khi chúng ta làm việc với continuous data (ví dụ như big file) >> stream sẽ trở nên handy

- Duplex >> use to read & write data sequentially
- Transform >> where data can be modified when writing or reading
