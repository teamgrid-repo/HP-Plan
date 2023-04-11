const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

function checkFileType(file, cb) {
    // Allowed Extension
    const fileTypes = /jpeg|jpg|png|gif|xlsx|sheet/;
    // check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // check mimetype
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb('Error: Images Only');
}
const upload = multer({
    storage,
});

module.exports = upload;
