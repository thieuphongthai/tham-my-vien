

class ReceptionController{
    getReceptionDashboard(req, res){
        res.render('reception');
    }

    getReceptionManagerDashboard(req, res){
        res.render('partials/reception/manager-reception');
    }

    getReceptionStaffDashboard(req, res){
        res.render('partials/reception/employee-reception')
    }

};


module.exports = new ReceptionController;