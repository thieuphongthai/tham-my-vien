const Customer = require('../models/Customer');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class BusinessController{

    getBusinessDashboard(req, res){
        res.render('business/business-overview');
    }

    showCustomer(req, res, next){
        Customer.find({})
            .then((customers) => {
                res.render('business/business-customer', {
                    customers: multipleMongooseToObject(customers)
                })
            })
            .catch(next)
    }

    createCustomer(req, res, next){
        if (req.file) {
			const customer = new Customer({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				description: req.body.description,
				image: {
					name: req.file.filename,
					url: req.file.path,
				},
			});
            customer.save();
		} else {
			const customer = new Customer({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				birth: req.body.birth,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				description: req.body.description,
				image: {
					name: "",
					url: "",
				},
			});
			customer.save();
		}
        res.redirect('back');
    }

    getServiceNoteDashboard(req, res){
        res.render('business/business-service-note');
    }
}

module.exports = new BusinessController;