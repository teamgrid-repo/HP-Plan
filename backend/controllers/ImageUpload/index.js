const mime = require("mime");
const fs = require("fs");
const aws = require("../../connection/s3_utils")
const {isEmpty} = require("lodash");
const {envConstants} = require("../../helpers/constants");


   /* [
    {
        fieldname: 'image',
        originalname: 'john-arano-h4i9G-de7Po-unsplash.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads',
        filename: '1642500104399-john-arano-h4i9G-de7Po-unsplash.jpg',
        path: 'uploads/1642500104399-john-arano-h4i9G-de7Po-unsplash.jpg',
        size: 3720762
    }
    ]*/


async function uploadBase64ToS3(image, userId){
    try {
        let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/), response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = `${Date.now()}image2.` + extension;
        if(!isEmpty(imageBuffer)){
            const bucketName = envConstants.BUCKET_NAME + '/image/' + `${userId}`
            fs.writeFileSync(`./uploads/` + fileName, imageBuffer, 'utf8');
            let data = fs.readFileSync(`uploads/${fileName}`);
            let originalUpload = await aws.uploadImageToS3(fileName,data,bucketName,type)
            fs.unlinkSync("./uploads/" + fileName);
            return { err: false, msg: { link: originalUpload, fileName } }
        }
        return {err: false, msg: []}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function uploadExcelToParsingData(filePath){
    try {
        const reader = require('xlsx')
        // Reading our test file
        const file = reader.readFile(filePath)
        let data = []
        const sheets = file.SheetNames
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => { data.push(res) })
        }
        // Printing data
        return { err: false, msg: data}
    } catch (err){
        return { err: true, msg: err }
    }
}

module.exports= {
    uploadBase64ToS3,
    uploadExcelToParsingData
}
