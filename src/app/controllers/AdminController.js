class AdminController {
    getAdminDashboard(req, res, next) {
		res.render("admin");
    }
}

module.exports = new AdminController;
