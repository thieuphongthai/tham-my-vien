const appRoot = require('app-root-path');
const fs = require('fs');
const storage = require('./storage');
const imageFilter = function(req, file, cb) {

    let files = fs.readdirSync(appRoot + '/src/public/img/uploads/users/');
    console.log('files', files);
    console.log('req file path in helper', file);
    storage.storage.filename(file);
    if(files.includes(file.originalname)){
        fs.unlinkSync(appRoot + '/src/public/img/uploads/users/' + file.originalname);
    }

    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|wepb|WEPB)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;