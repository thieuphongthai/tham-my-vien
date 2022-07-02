const Customer = require("../models/Customer");
const Department = require("../models/Department");
const User = require("../models/User");
const Account = require("../models/Account");
const Role = require("../models/Role");
const Position = require("../models/Position");
const Status = require("../models/Status");
const Service = require("../models/Service");
const ServiceNote = require("../models/ServiceNote");
const {
	multipleMongooseToObject,
	mongooseToObject,
} = require("../../util/mongoose");
var bcrypt = require("bcryptjs");

class AdminController {
	getAdminDashboard(req, res, next) {
		res.render("admin/admin-login");
	}

	//CUSTOMER
	getAdminCustomer(req, res, next) {
		Customer.find({})
			.then((customers) => {
				res.render("admin/admin-customer", {
					customers: multipleMongooseToObject(customers),
				});
			})
			.catch(next);
	}

	createCustomer(req, res, next) {
		const customer = new Customer(req.body);
		customer
			.save()
			.then(() => res.redirect("customer"))
			.catch(next);
	}

	editCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then((customer) =>
				res.render("admin/admin-customer", {
					customer: mongooseToObject(customer),
				})
			)
			.catch(next);
	}

	updateCustomer(req, res, next) {
		Customer.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	destroyCustomer(req, res, next) {
		console.log("customer", req.params.id);
		Customer.deleteOne({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}
	//END CUSTOMER

	//USER
	getAdminUser(req, res, next) {
		Promise.all([
			User.find({}),
			Department.find({}),
			Position.find({}),
			Role.find({}),
		])
			.then(([users, departments, positions, roles]) => {
				res.render("admin/admin-user", {
					users: multipleMongooseToObject(users),
					departments: multipleMongooseToObject(departments),
					positions: multipleMongooseToObject(positions),
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

	createUser(req, res, next) {
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			birth: req.body.birth,
			gender: req.body.gender,
			phone: req.body.phone,
			email: req.body.email,
			address: req.body.address,
			department: req.body.department,
			position: req.body.position,
			description: req.body.description,
		});
		user.save()
			.then(() => res.redirect("user"))
			.catch(next);
	}

	editUser(req, res, next) {
		User.findById(req.params.id)
			.then((user) =>
				res.render("admin/admin-useredit", {
					user: mongooseToObject(user),
				})
			)
			.catch(next);
	}

	updateUser(req, res, next) {
		User.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect("/admin/user"))
			.catch(next);
	}

	destroyUser(req, res, next) {
		console.log(req.params.id);
		User.deleteOne({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}
	//END USER

	//DEPARTMENT
	getAdminDepartment(req, res, next) {
		Department.find({})
			.then((departments) => {
				res.render("admin/admin-department", {
					departments: multipleMongooseToObject(departments),
				});
			})
			.catch(next);
	}

	createDepartment(req, res, next) {
		const department = new Department(req.body);
		department
			.save()
			.then(() => res.redirect("department"))
			.catch(next);
	}

	editDepartment(req, res, next) {
		Department.findById(req.params.id)
			.then((department) =>
				res.render("admin/admin-departmentedit", {
					department: mongooseToObject(department),
				})
			)
			.catch(next);
	}

	updateDepartment(req, res, next) {
		Department.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect("/admin/department"))
			.catch(next);
	}

	//END DEPARTMENT

	//ACCOUNT
	getAdminAccount(req, res, next) {
		Promise.all([
			Account.find({}),
			User.find({}),
			Position.find({}),
			Role.find({}),
		])
			.then(([accounts, users, positions, roles]) => {
				res.render("admin/admin-account", {
					accounts: multipleMongooseToObject(accounts),
					users: multipleMongooseToObject(users),
					positions: multipleMongooseToObject(positions),
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

	createAccount(req, res, next) {
		const account = new Account({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			role_id: req.body.roleId,
		});
		// save user into db
		account.save((err, account) => {
			// check error
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				console.log("2", req.body.roleId);
				Role.find(
					{
						_id: { $in: req.body.roleId },
					},
					(err, role) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						console.log("account.role", account.role_id);
						account.role_id = role.map((role) => role._id);
						account.save((err) => {
							if (err) {
								res.status(500).send({ message: err });
								return;
							}
							res.redirect("account");
							return;
						});
					}
				);
			}
		});
	}

	editAccount(req, res, next) {
		Account.findById(req.params.id)
			.then((account) =>
				res.render("admin/admin-accountedit", {
					account: mongooseToObject(account),
				})
			)
			.catch(next);
	}

	updateAccount(req, res, next) {
		Account.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect("/admin/account"))
			.catch(next);
	}
	//END ACCOUNT

	//ROLES
	getAdminRole(req, res, next) {
		Role.find({})
			.then((roles) => {
				res.render("admin/admin-role", {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}
	//END ROLES

	//POSITION
	getAdminPosition(req, res, next) {
		Position.find({})
			.then((positions) => {
				res.render("admin/admin-position", {
					positions: multipleMongooseToObject(positions),
				});
			})
			.catch(next);
	}

	createPosition(req, res, next) {
		const position = new Position(req.body);
		position
			.save()
			.then(() => res.redirect("position"))
			.catch(next);
	}

	editPosition(req, res, next) {
		Position.findById(req.params.id)
			.then((position) =>
				res.render("admin/admin-positionedit", {
					position: mongooseToObject(position),
				})
			)
			.catch(next);
	}

	updatePosition(req, res, next) {
		Position.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect("/admin/position"))
			.catch(next);
	}
	//END POSITION

	//SERVICE NOTE
	getAdminServiceNote(req, res, next) {
		Promise.all([
			ServiceNote.find({}),
			Customer.find({}),
			User.find({}),
			Status.find({}),
			Service.find({}),
		])
			.then(([serviceNotes, customers, users, status, services]) => {
				res.render("admin/admin-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					customers: multipleMongooseToObject(customers),
					users: multipleMongooseToObject(users),
					status: multipleMongooseToObject(status),
					services: multipleMongooseToObject(services),
				});
			})
			.catch(next);
	}

	creatAdminServiceNote(req, res, next) {
		const serviceNote = new ServiceNote({
			customer: req.body.customer,
			user: req.body.user,
			service: req.body.service,
			status: req.body.status,
			comments: req.body.description,
		});
		ServiceNote.findOne({ customer: req.body.customer })
			.then((customer) => {
				if (!customer) {
					serviceNote.save();
					res.redirect("service-note");
					return;
				} else {
					ServiceNote.updateOne(
						{ customer: req.body.customer },
						req.body
					)
						.then(() => res.redirect("/admin/service-note"))
						.catch(next);
					return;
				}
			})
			.catch(next);
	}

	destroyServiceNote(req, res, next) {
		ServiceNote.deleteOne({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}
	//END SERVICE NOTE
}

module.exports = new AdminController();
