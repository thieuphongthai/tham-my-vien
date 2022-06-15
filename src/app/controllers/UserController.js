const User = require('../models/User');
const Role = require('../models/Role');
const Department = require('../models/Department');
const multipleMongooseToObject = require('../../util/mongoose')
// const Promise = require('Promise');

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

    create(req, res, next) {
		// Promise(Role.find({}), {
			
		// },
		// const users = new Account({
		// 	firstName: req.body.firstName,
		// 	middleName: req.body.middleName,
		// 	lastName: req.body.lastName,
		// 	birth: req.body.birth,
		// 	gender: req.body.gender,
		// 	phoneNumber: req.body.phoneNumber,
		// 	adress: req.body.address,
		// 	email: req.body.email,
		// 	department_id: req.body.birth,
		// 	image: req.body.image,
		// 	account: req.body.account,
		// }),
		// )
        res.render('users/create');
    }
}

module.exports = new UserController;
