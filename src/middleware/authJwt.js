// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
// const Role = require('../app/models/Role');
const Department = require("../app/models/Department");
const Position = require("../app/models/Position");

class authJwt {
	verifyToken(req, res, next) {
		let token = req.headers['cookie'];
		console.log('auth token', token);
		if (!token) {
			return res.status(403).send({message: 'Khong co quyen su dung chuc nang nay'});
		}
		const formatToken = token.split("=")[1].split('; ')[0];
		console.log('formatToken', formatToken);
		jwt.verify(formatToken, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
			if (err) {
				// console.log(err)
				return res.status(401).send({ message: "Ma token khong dung" });
			}
			req.userId = decoded.id;
			next();
		});
	}

	isMarketingEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					// res.status(403).send({ message: "Nhan vien Marketing" });
					// return;
				}
			}).catch(next);
	}
	
	isMarketingManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Quan ly Marketing" });
					return;
				}
			}).catch(next);
	}

	isBusinessEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Nhan vien Kinh doanh" });
					return;
				}
			}).catch(next);
	}

	isBusinessManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Quan ly Kinh doanh" });
					return;
				}
			}).catch(next);
	}

	isReceptionEmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Nhan vien Le tan" });
					return;
				}
			}).catch(next);
	}

	isReceptionManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Quan ly Le tan" });
					return;
				}
			}).catch(next);
	}

	isDoctor(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (users.department === users[0].name && users.position === users[1].name) {
					next();
					res.status(403).send({ message: "Bac si" });
					return;
				}
			}).catch(next);
	}

	isNursing(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (
					users.department === users[0].name &&
					users.position === users[1].name
				) {
					next();
					res.status(403).send({ message: "Dieu duong" });
					return;
				}
			}).catch(next);
	}

	isHREmploy(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (
					users.department === users[0].name &&
					users.position === users[1].name
				) {
					next();
					res.status(403).send({ message: "Nhan vien Nhan su" });
					return;
				}
			}).catch(next);
	}

	isHRManager(req, res, next) {
		Promise.all([User.findById(req.userId), Department.find({}), Position.find({})])
			.then((users) => {
				if (
					users.department === users[0].name &&
					users.position === users[1].name
				) {
					next();
					res.status(403).send({ message: "Quan ly Nhan su" });
					return;
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
