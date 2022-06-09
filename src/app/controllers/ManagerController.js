
class ManagerController {
    //[GET] Manager dashboard
    getManagerDashboard(req, res) {
        res.render('home');
    }
}

module.exports = new ManagerController;