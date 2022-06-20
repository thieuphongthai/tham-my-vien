const Role = require('../models/Role');
// const mongooseToObject = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');


class RoleController {

    getRoleDashboard(req, res, next) {
		Role.find({})
        .then(roles => {
            res.render('roles/role', {
                roles: multipleMongooseToObject(roles)
            })
        })
        .catch(next);
    }

    postRoleDashboard(req, res, next) {
        console.log('1', req.body);
        const role = new Role(req.body);
        console.log('2', role);
		role.save()
			.then(({}) => res.redirect('/role'))
			.catch(next)
    }

	// getCreateDashboard(req, res, next) {
	// 	res.render('users/create');
	// }
	

	// upload(req, res, next) {
	// 	// req.file contains information of uploaded file
	// 	// req.body contains information of text fields, if there were any
	// 	console.log(req.file)
	// 	if (req.fileValidationError) {
	// 		return res.send(req.fileValidationError);
	// 	}
	// 	else if (!req.file) {
	// 		return res.send('Please select an image to upload');
	// 	}
	// 	else if (err instanceof multer.MulterError) {
	// 		return res.send(err);
	// 	}
	// 	else if (err) {
	// 		return res.send(err);
	// 	}
	
	// 	// Display uploaded image for user validation
	// 	res.send(`You have uploaded this image: <hr/><img src="${req.file.filename}" width="500"><hr /><a href="/user">Upload another image</a>`);
	// };

    // create(req, res, next, imageFileName) {
        
	// 	console.log(imageFileName);
	// 	const users = new Account({
	// 		firstName: req.body.firstName,
	// 		middleName: req.body.middleName,
	// 		lastName: req.body.lastName,
	// 		birth: req.body.birth,
	// 		gender: req.body.gender,
	// 		phoneNumber: req.body.phoneNumber,
	// 		adress: req.body.address,
	// 		email: req.body.email,
	// 		department_id: req.body.birth,
	// 		image: req.body.image,
	// 		account: req.body.account,
	// 	})
    //     res.render('users/create');
    // }
}

module.exports = new RoleController;
