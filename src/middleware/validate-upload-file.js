const multer = require('multer');
const helpers = require('./helpers');
const storage = require('./storage');

class validateUploadImage {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    upload = multer({ storage: storage.storage, fileFilter: helpers.imageFilter }).single('image');
        
    upload(req, res, err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
    
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
    
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.filename}" width="500"><hr /><a href="/user">Upload another image</a>`);
    };
}

module.exports = new validateUploadImage;
