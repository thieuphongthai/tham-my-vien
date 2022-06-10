const Account = require('../models/Account');
const Role = require('../models/Role');
const { multipleMongooseToObject } = require('../../util/mongoose');

class LoginController {
	//[GET] Login
	getLogin(req, res) {
		res.render("login", { layout: false });
	}

	postLogin(req, res, next) {
		// Account.find({}, function (err, accounts) {
			
		// 	multipleMongooseToObject(accounts, {
				
		// 	});
			
		// })

		Account.find({})
			.then(accounts => {
				res.render('manager', {
					accounts: multipleMongooseToObject(accounts)
				});
			})
			.catch(next);
  	}
}

module.exports = new LoginController;
