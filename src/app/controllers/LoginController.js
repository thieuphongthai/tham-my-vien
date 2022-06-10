const Role = require('../models/Role');
const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { emailDB, passwordDB } = require('../../middleware/login');

class LoginController {
	//[GET] Login
	getLogin(req, res) {
		res.render("login", { layout: false });
	}

	postLogin(req, res, next) {
		// res.render('manager');
		// console.log(emailDB, passwordDB);
		Account.find({})
			.then(accounts => {
				// multipleMongooseToObject(accounts)
				let emailDB;
				let emailReq = req.body.email;
				let passwordDB;
				let passwordReq = req.body.password;
				for (const item of accounts) {
					emailDB = item.email;
					passwordDB = item.password;
					
				}
				if (emailReq === emailDB && passwordReq === passwordDB) {
					res.render('manager');
				} else {
					res.status(400).json('Email hoặc mật khẩu không đúng');
				}
			})
			.catch(next)

		// Account.find({})
		// 	.then(accounts => {
		// 		res.render('manager', {
		// 			// accounts: multipleMongooseToObject(accounts)
		// 		});
		// 	})
		// 	.catch(next);
  	}
}

module.exports = new LoginController;
