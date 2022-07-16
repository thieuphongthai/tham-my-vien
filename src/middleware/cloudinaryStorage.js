const cloudinary = require('./cloudinaryUpload');
const path = require('path');

class storage {
    async storageSingle(req, res) {
        //req.file.path chính là đường dẫn của file khi upload bằng multer
        console.log('req file path', req.file.path);
        cloudinary.uploadSingle(req.file.path).then((result) => {
            let imageDetails = {
                imageName: req.body.imageName || '',
                cloudImage: result.url,
                imageId: result.id
            }
        })
        
        res.json(req.file)
    }


    //up multiple files
    async storageMultiple(req, res) {
        //req.files chính là khi upload multiple images
        let res_promises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.uploadMultiple(file.path).then((result) => {
                resolve(result);
            })
        }))
        
        // Promise.all get imgas
        Promise.all(res_promises)
        .then(async (arrImg) => {
           //arrImg chính là array mà chúng ta đã upload 
           // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
           res.json(req.files)
        })
        .catch((error) => {
            console.error('> Error>', error);
        })
    }
}

module.exports = new storage;