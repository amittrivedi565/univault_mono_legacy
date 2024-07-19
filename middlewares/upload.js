require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Config = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    Bucket: process.env.AWS_BUCKET_NAME
  });

const storage = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
        console.log(file)
        cb(null,file.originalname)
    }
});

const upload = multer({storage: storage})

exports.profilePdf = upload; 