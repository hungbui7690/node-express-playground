/*
  Multer
  - Here are the options
    + S3: Instance of aws s3 to which you want to upload this code
    + metadata: metadata generation function. generates the name s of the files as field names
    + key: key of the s3 for uploaded files this is just the date and time of the file being uploaded
    + bucket: files from multer will be saved to which s3 bucket (name)
    + acl: Access control list of aws


*/

require('express-async-errors')
const express = require('express')
const app = express()

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
  accessKeyId: 'access_key_id',
  secretAccessKey: 'secret_access_key',
  region: '<your_region>',
})

const fileUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: '<your_bucket_name>',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      // whatever is the field name that you have given to the files that are being uploaded like
      // photos, documents etc
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

app.post('/upload', upload.single('file'), function (req, res, next) {
  res.json({ message: 'Uploaded to S3' })
})

//*****************************
// START
//*****************************
const port = process.env.PORT || 5000

const start = async () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`))
}

start()
