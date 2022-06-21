
class MarketingController{

    getMarketingDashboard(req, res){
        res.render('partials/marketing/marketing')
    };

    getManagerMakertingDashboard(req, res){
        res.render('partials/marketing/manager-marketing');
    };

    getStaffMarketingDashboard(req, res){
        res.render('partials/marketing/employee-marketing');
    };
};

module.exports = new MarketingController;

