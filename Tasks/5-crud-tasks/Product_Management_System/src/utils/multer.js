const multer = require('multer');

const path = require('path');

const IMAGE_CHECK = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = IMAGE_CHECK[file.mimetype];
        let errorUpload = new Error ('Uploading error');
        if(isValid){
            errorUpload = null
        }

        cb(errorUpload, 'uploads')
    },

    filename: function(req, file, cb){
        const fileName = file.originalname.split(' ').join('-');
        const extension = IMAGE_CHECK[file.mimetype];
        
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})


const upload = multer ({storage: storage});

module.exports = upload