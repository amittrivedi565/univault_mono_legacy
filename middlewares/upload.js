const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId : "",
    secretAccessKey : ""
})

const s3 = new AWS.s3();