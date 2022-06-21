
class SaleController{

    getSaleDashboard(req, res){
        res.render('partials/sales/sale');
    }

    getSaleManagerDashboard(req, res){
        res.render('partials/sales/manager-sale');
    }

    getSaleStaffDashboard(req, res){
        res.render('partials/sales/employee-sale');
    }
}

module.exports = new SaleController;