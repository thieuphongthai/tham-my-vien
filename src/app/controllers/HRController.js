
class HRController{

    getHRDashboard(req, res){
        res.render('partials/sales/sale');
    }

    getHRManagerDashboard(req, res){
        res.render('partials/sales/manager-sale');
    }

    getHRStaffDashboard(req, res){
        res.render('partials/sales/employee-sale');
    }
}

module.exports = new HRController;