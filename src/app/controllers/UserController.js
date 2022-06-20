const User = require('../models/User');
const Role = require('../models/Role');
const Department = require('../models/Department');
const multipleMongooseToObject = require('../../util/mongoose')
const multer = require('multer');
const helpers = require('../../middleware/helpers');
const storage = require('../../middleware/storage');

var upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('image');

class UserController {

    getUserDashboard(req, res, next) {
		// Promise.all(Role.find({}), Department.find({}))
		// 	.then((roles, departments) => {
		// 		res.render('users/user', {
		// 			roles: multipleMongooseToObject(roles),
		// 			departments: multipleMongooseToObject(departments),
		// 		})
		// 	})
		// 	.catch(next);
		res.render('users/user');
    }

	getCreateDashboard(req, res, next) {
		res.render('users/create');
	}
	

	upload(req, res, next) {
		// req.file contains information of uploaded file
		// req.body contains information of text fields, if there were any
		console.log(req.file)
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

    create(req, res, next) {
        
		// console.log(imageFileName);
		const users = new Account({
			firstName: req.body.firstName,
			middleName: req.body.middleName,
			lastName: req.body.lastName,
			birth: req.body.birth,
			gender: req.body.gender,
			phoneNumber: req.body.phoneNumber,
			adress: req.body.address,
			email: req.body.email,
			department_id: req.body.birth,
			// image: req.body.image,
			account: req.body.account,
		});
		users.save()
		.then(() => { res.redirect('/user')})
		.catch(next)
    }
}

module.exports = new UserController;
