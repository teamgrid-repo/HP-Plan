const AWS = require("aws-sdk");
const fs = require("fs");
const { envConstants } = require("../helpers/constants")

const s3bucket = new AWS.S3({
    accessKeyId: envConstants.S3_ACCESS,
    secretAccessKey: envConstants.S3_SECRET
})

const uploadImageToS3 = (key, data, bucketName, contentType) => new Promise((resolve, reject) => {
    const params = {
        Key: key,
        Body: data,
        ContentType: contentType,
        Bucket: bucketName,
        ACL: 'public-read',
    };
    console.log(envConstants.BUCKET_NAME)
    s3bucket.upload(params, async (error, fileInfo) => {
        if (error) {
            return reject(error);
        }
        return resolve(fileInfo.Location);
    });
});

const fileUpload = async (file, userId) => {
    try {
        let fileContentType = file.mimetype;
        let contentType = 'application/octet-stream';
        contentType = fileContentType;
        const fileName = file.fieldname + '.' + file.originalname.split('.')[1];
        let data = fs.readFileSync(file.path);
        let bucketName = envConstants.BUCKET_NAME + '/image/' + `${userId}/${Date.now()}`;
        let originalUpload = await uploadImageToS3(`${fileName}`, data, bucketName, contentType);
        fs.unlinkSync(file.path);
        return originalUpload;
    } catch (error) {
        console.log(error);
    }
}

const removeImageToS3 = (key, bucketName) => new Promise((resolve, reject) => {
    const params = {
        Key: key,
        Bucket: bucketName,
    };
    s3bucket.deleteObject(params, function (error, data) {
        if (error) {
            return reject(error);
        }
        return resolve(data);
    })
});


const fileRemove = async (fileName, userId) => {
    try {
        const bucketName = envConstants.BUCKET_NAME + '/images' + `/${userId}`;
        await removeImageToS3(`${fileName}`, bucketName);
    } catch (error) {
        return error;
    }
}

module.exports = {
    fileUpload,
    fileRemove,
    uploadImageToS3
}