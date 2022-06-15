

class ReceptionController{
    getReceptionDashboard(req, res){
        res,render('reception');
    }

};


module.exports = new ReceptionController;