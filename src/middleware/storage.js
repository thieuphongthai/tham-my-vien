const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const clc = require("cli-color");
    
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img/uploads/users/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.storage = storage;