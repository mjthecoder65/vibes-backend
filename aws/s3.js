const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const region = "ap-northeast-2"
const bucketName = "vibes-music"
const accessKeyId = "AKIAQSYLM4TCUBV3KWXT"
const secretAccessKey = "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"

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
