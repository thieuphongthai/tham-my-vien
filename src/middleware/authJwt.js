// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
// const Role = require('../app/models/Role');
const Department = require("../app/models/Department");
const Position = require("../app/models/Position");
const { multipleMongooseToObject } = require("../util/mongoose");

class authJwt {
	verifyToken(req, res, next) {
		let token = req.session.token;
		console.log('auth token', token);
		if (!token) {
			return res.status(403).redirect('/');
		}
		jwt.verify(token, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
			if (err) {
				// console.log(err)
				return res.status(401).redirect('/');
			}
			req.userId = decoded.id;
			next();
		});
	}

	isMarketingEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}
	
	isMarketingManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isBusinessEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isBusinessManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isReceptionEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isReceptionManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isDoctor(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isNursing(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name){
					next();
				}
			}).catch(next);
	}

	isHREmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isHRManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((user) => {
				if (user.department === user[0].name && user.position === user[1].name) {
					next();
				}
			}).catch(next);
	}

	isAdmin(req, res, next) {
		Promise.all([Account.findById(req.body._id), Role.find({})])
			.then((users, roles) => {
				if (users.role === roles.engName) {
					console.log(users.role);
					console.log(roles.engName);
					next();
					res.status(403).send({ message: "Yêu cầu vai trò quản trị viên" });
					return;
				}
			})
			.catch(next);
	}

	isRoot(req, res, next) {
		Promise.all([Account.findById(req.body._id), Role.find({})])
			.then((users, roles) => {
				if (users.role === roles.engName) {
					console.log(users.role);
					console.log(roles.engName);
					next();
					res.status(403).send({ message: "Yêu cầu vai trò gốc!" });
					return;
				}
			})
			.catch(next);
	}
}

module.exports = new authJwt();
