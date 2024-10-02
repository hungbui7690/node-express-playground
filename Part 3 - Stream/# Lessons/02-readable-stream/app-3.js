// Readable Stream P3: Object Mode

const { Readable } = require('stream')

// READABLE STREAM

const funnies = [
  'My mother always used to say: The older you get, the better you get, unless you’re a banana.',
  'Clothes make the man. Naked people have little or no influence in society',
  "I love being married. It's so great to find that one special person you want to annoy for the rest of your life",
  'Never follow anyone else’s path. Unless you’re in the woods and you’re lost and you see a path. Then by all means follow that path.',
  'I walk around like everything’s fine, but deep down, inside my shoe, my sock is sliding off.',
]

// (***) This is bts
class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true }) // object mode
    this.array = array
    this.index = 0
  }

  // object mode
  _read() {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      }
      // push chunk into pipeline
      this.push(chunk)
      this.index++
    } else {
      this.push(null)
    }
  }
}

const stream = new StreamFromArray(funnies)

stream.on('data', (chunk) => console.log(chunk))

stream.on('end', () => console.log(`End of Stream`))
