const Account = require('../models/Account');
// const Role = require('../models/Role');

class ManagerController {
    //[GET] Manager dashboard
    getManagerDashboard(req, res) {
        Account.find({}, function (err, roles) {
			if(!err) return res.json(roles);
			return res.status(400).json({ error: 'Error'});
		});
        // res.render('manager');
    }
}

module.exports = new ManagerController;