const multer = require("multer");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const keys = require('../config/keys')

aws.config.update({ region: 'us-east-2' });

const s3 = new aws.S3({
  accessKeyId: keys.AWS_CLIENT,
  secretAccessKey: keys.AWS_SECRET,
  Bucket: 'zones-images'
});

const storage = multerS3({
  s3: s3,
  bucket: 'zones-images',
  key: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  }
});

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var uploadFile = multer({ storage: storage, limits: { fileSize: 2000000 }, fileFilter: excelFilter });
module.exports = uploadFile;

/* var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}); */