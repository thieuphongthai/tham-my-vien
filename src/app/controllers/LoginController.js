const Account = require('../models/Account');
const Role = require('../models/Role');
const { multipleMongooseToObject } = require('../../util/mongoose');

class LoginController {
	//[GET] Login
	getLogin(req, res) {
		res.render("login", { layout: false });
	}

	postLogin(req, res, next) {
		Account.find({}, function (err, accounts) {
			let email = multipleMongooseToObject(accounts.email)
			console.log(multipleMongooseToObject(accounts.email));
		})
  	}
}

module.exports = new LoginController;
