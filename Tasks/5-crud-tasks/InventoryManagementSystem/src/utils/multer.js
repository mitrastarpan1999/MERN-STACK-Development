const multer = require('multer');
const path = require('path');

const FILE_MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isOK = FILE_MIME_TYPE[file.mimetype];
        let uploadError = new Error ('There is an error')
        if(isOK) {
            uploadError = null
        }
        cb(uploadError, 'uploads')
    },

    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_MIME_TYPE[file.mimetype];

        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload = multer ({storage: storage});

module.exports = upload