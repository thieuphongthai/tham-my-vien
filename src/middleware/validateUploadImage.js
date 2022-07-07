const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

class validateUploadImage {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    upload = multer({ storage: storage.storage, fileFilter: helpers.imageFilter }).single('image');
}

module.exports = new validateUploadImage;
