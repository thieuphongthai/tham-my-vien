const Role = require('../models/Role');
const Account = require('../models/Account');
const User = require('../models/User');
const Department = require('../models/Department');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { emailDB, passwordDB } = require('../../middleware/login');
var bcrypt = require("bcryptjs");


class RootController {
    getRootDashboard(req, res, next) {
		res.render("root/root");
    }

    getRootMarketingDashboard(req, res, next) {
		res.render("admin");
    }
    
    getRootBussinessDashboard(req, res, next) {
		res.render("admin");
    }

    getRootReceptionDashboard(req, res, next) {
		res.render("admin");
    }

    getRootOperatingRoomDashboard(req, res, next) {
		res.render("admin");
    }

    getRootCustomerDashboard(req, res, next) {
		res.render("admin");
    }

    getRootServiceNoteDashboard(req, res, next) {
		res.render("admin");
    }

	// [GET] /user
    getRootUserDashboard(req, res, next) {
		User.find({})
			.then(users => {
				res.render('root/root-users', {
					users: multipleMongooseToObject(users)
				});
			})
			.catch(next);
    }
     
	// [POST] /account
    postRootAccountDashboard(req, res, next) {
		const account = new Account({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		account.save((err, account) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				res.redirect('account');
			}
		});
    }

	// [GET] /account
    getRootAccountDashboard(req, res, next) {
      	Account.find({})
			.then(accounts => {
				res.render('root/root-accounts', {
					accounts: multipleMongooseToObject(accounts)
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
}

module.exports = new RootController;
