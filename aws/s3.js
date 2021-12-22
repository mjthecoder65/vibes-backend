const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const region = ""
const bucketName = ""
const accessKeyId = ""
const secretAccessKey = ""

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function(req, file, cb) {
            cb(null, { fileName: file.fieldname })
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}

module.exports = { upload, getFileStream };
