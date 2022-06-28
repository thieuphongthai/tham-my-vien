const Role = require('../models/Role');
const Account = require('../models/Account');
const User = require('../models/User');
const Department = require('../models/Department');
const Position = require('../models/Position');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
// const { multipleMongooseToObject } = require('../../util/mongoose');
var bcrypt = require("bcryptjs");


class RootController {

	getRootLogin(req,res, next) {

	}

	postRootLogin(req, res, next) {

	}

    getRootDashboard(req, res, next) {
		res.render("root/root-dashboard");
    }

    getRootMarketingDashboard(req, res, next) {
		res.render("root/root-marketing");
    }
    
    getRootBussinessDashboard(req, res, next) {
		res.render("root/root-business");
    }

    getRootReceptionDashboard(req, res, next) {
		res.render("root/root-reception");
    }

    getRootOperatingRoomDashboard(req, res, next) {
		res.render("root/root-operating-room");
    }

    getRootCustomerDashboard(req, res, next) {
		res.render("root/root-customer");
    }

    getRootServiceNoteDashboard(req, res, next) {
		res.render("root/root-service-note");
    }



	// [GET] /user
    getRootUserDashboard(req, res, next) {
		Promise.all([User.find({}), Department.find({}), Position.find({}), Role.find({})])
			.then(([users, departments, positions, roles]) => {
				res.render('root/root-users', {
					users: multipleMongooseToObject(users),
					departments: multipleMongooseToObject(departments),
					positions: multipleMongooseToObject(positions),
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
    }

    // [POST] /user
	postRootUserDashboard(req, res, next) {
        console.log(req.body)
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
            .then(() => {
                res.redirect('user');
            })
            .catch(next);
	}
     
	// [POST] /account
    postRootAccountDashboard(req, res, next) {

		// create new user
		const account = new Account({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
            role_id: req.body.roleId
		});
		// save user into db
		account.save((err, account) => {
			// check error
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				console.log('2', req.body.roleId)
                Role.find(
                    {
                        _id: { $in: req.body.roleId },
                    },
                    (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
						console.log('account.role', account.role_id);
                        account.role_id = role.map((role) => role._id);
                        account.save((err) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.redirect('account');
							return;
                        });
                    }
                );
            }
		});
    }

	// [GET] /account
    getRootAccountDashboard(req, res, next) {

		Promise.all([Account.find({}), Role.find({})])
			.then(([accounts, roles]) => {
				res.render('root/root-accounts', {
					accounts: multipleMongooseToObject(accounts),
					roles: multipleMongooseToObject(roles)
				});
			})
			.catch(next);
    }
    
    // [POST] /department
    createDepartment(req, res, next) {
		const department = new Department(req.body);
		department.save()
			.then(() => res.redirect('department'))
			.catch(next)
    }


    // [GET] /department
    getRootDepartmentDashboard(req, res, next) {
		Department.find({})
			.then(departments => {
				res.render("root/root-departments", {
					departments: multipleMongooseToObject(departments)
				});
			})
			.catch(next);
    	}

	// [POST] /role
	createRootRoleDashboard(req, res, next) {
		const role = new Role(req.body);
		role.save()
			.then(() => res.redirect('roles'))
			.catch(next)	
	}
        
	// [GET] /role
    getRootRoleDashboard(req, res, next) {
      	Role.find({})
			.then(roles => {
				res.render('root/root-roles', {
					roles: multipleMongooseToObject(roles)
				});
			})
			.catch(next);
    }
          
    getRootServiceDashboard(req, res, next) {
      	res.render("services/service");
    }

	getRootStatusDashboard(req, res, next) {
		res.render("statuses/status");
    }

	// [GET] Login
    getRegister(req, res, next) {
        Role.find({})
			.then(roles => {
				res.render('register', {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

    // [POST] Register
    postRegister(req, res) {
        const account = new Account({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role_id: { $in: req.body.role_id }
        });
        account.save((err, account) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.role_id) {
                Role.find(
                    {
                        name: { $in: req.body.role_id },
                    },
                    (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        account.role_id = role.map((role) => role._id);
                        account.save((err) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.send({ message: "Đăng ký tài khoản thành công!" });
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
                        res.redirect('login');
                    });
                });
            }
        });
    };
}

module.exports = new RootController;
