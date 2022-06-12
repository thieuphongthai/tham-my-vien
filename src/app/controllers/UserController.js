class UserController {
    getUserDashboard(req, res, next) {
		res.render("users/user");
    }

    create(req, res, next) {
        res.render('users/create');
    }
}

module.exports = new UserController;
