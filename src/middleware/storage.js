const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
    
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img/uploads/customers/');
    },

    // destination: function(req, file, cb){
    //     cb(null, appRoot + '/src/public/img/uploads/users/');
    // },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        // console.log('tên file',)
        console.log('file', file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// const storageCustomerBefore = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, appRoot + '/src/public/img/uploads/customers/before/');
//     },

//     // destination: function(req, file, cb){
//     //     cb(null, appRoot + '/src/public/img/uploads/users/');
//     // },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         // console.log('tên file',)
//         console.log(file)
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });



exports.storage = storage;