const User = require('../models/User');
const multipleMongooseToObject = require('../../util/mongoose')

class UserController {
    getUserDashboard(req, res, next) {
		res.render("users/user");
    }

    create(req, res, next) {
		
        res.render('users/create');
    }
}

module.exports = new UserController;
