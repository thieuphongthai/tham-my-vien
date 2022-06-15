
class BusinessController{

    getBusinessDashboard(req, res){
        res.render('business');
    }

    getManagerDashboard(req, res){
        res.render('business');
    }

    getStaffDashboard(req, res){
        res.render('business');
    }
}

module.exports = new BusinessController;