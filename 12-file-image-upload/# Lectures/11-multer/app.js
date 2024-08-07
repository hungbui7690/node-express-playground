/*
  Multer
  - https://www.npmjs.com/package/multer


*************************

  - Single File
    + app.post('/profile', upload.single('avatar'), function (req, res, next) {}
  - Multiple Files 
    + app.post('/photos',upload.array('photos', 12),function (req, res, next) {}


  - req.file  -> /profile  -> single file
  - req.files -> /photos   -> multiple files
  - req.body will hold the text fields


*/

require('express-async-errors')
const express = require('express')
const app = express()

const multer = require('multer')
// const upload = multer({ dest: 'uploads/' }) // Method 1

// Method 2
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    // a.
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
    // b.
    // fileFilter: function (req, file, cb) {
    //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //     return cb(new Error('only file type of image is allowed'));
    //   }

    //   cb(null, true);
    // }
  },
})

app.use(express.static('./public'))

//*****************************

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    return res.status(200).json({ message: 'File uploaded successfully!' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

//*****************************

app.post('/photos', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('file upload failed')
  }

  return res.status(200).json({ message: 'File uploaded successfully!' })
})

//*****************************
// START
//*****************************
const port = process.env.PORT || 5000

const start = async () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`))
}

start()
