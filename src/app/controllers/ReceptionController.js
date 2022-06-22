

class ReceptionController{
    getReceptionDashboard(req, res){
        res.render('partials/reception/reception');
    }

    getReceptionManagerDashboard(req, res){
        res.render('partials/reception/manager-reception');
    }

    getReceptionStaffDashboard(req, res){
        res.render('partials/reception/employee-reception')
    }

};


module.exports = new ReceptionController;