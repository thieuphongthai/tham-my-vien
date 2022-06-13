const Role = require('../models/Role');
const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { emailDB, passwordDB } = require('../../middleware/login');

class SigninController {
	// //[GET] Login
	// getSignin(req, res) {
	// 	res.render("signin", { layout: false });
	// }

	postSignup (req, res) {
		const account = new Account({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		account.save((err, account) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			if (req.body.role) {
				Role.find(
					{
						name: { $in: req.body.role },
					},
					(err, role) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						account.role = role.map((role) => role._id);
						account.save((err) => {
							if (err) {
								res.status(500).send({ message: err });
								return;
							}
							res.send({ message: "User was registered successfully!" });
						});
					}
				);
			} else {
				Role.findOne({ name: "manager" }, (err, role) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					account.role = [role._id];
					account.save((err) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						res.send({ message: "User was registered successfully!" });
					});
				});
			}
		});
	};

	postSignin(req, res) {
		console.log(req.body.email);
		Account.findOne({
			email: req.body.email,
		})
		.populate("roles", "-__v")
		.exec((err, account) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			if (!account) {
				return res.status(404).send({ message: "User Not found." });
			}
			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);
			if (!passwordIsValid) {
				return res.status(401).send({ message: "Invalid Password!" });
			}
			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hours
			});
			var authorities = [];
			for (let i = 0; i < account.role.length; i++) {
				authorities.push("ROLE_" + account.role[i].name.toUpperCase());
			}
			req.session.token = token;
			res.status(200).send({
				id: account._id,
				userName: account.userName,
				email: account.email,
				role: authorities,
			});
		});
	};
	// postLogin(req, res, next) {
	// 	Account.find({})
	// 		.then(accounts => {
	// 			let emailDB;
	// 			let emailReq = req.body.email;
	// 			let passwordDB;
	// 			let passwordReq = req.body.password;
	// 			for (const item of accounts) {
	// 				emailDB = item.email;
	// 				passwordDB = item.password;
					
	// 			}
	// 			if (emailReq === emailDB && passwordReq === passwordDB) {
	// 				res.render('admin');
	// 			} else {
	// 				res.status(400).json('Email hoặc mật khẩu không đúng');
	// 			}
	// 		})
	// 		.catch(next);
  	// }
}

module.exports = new SigninController;
