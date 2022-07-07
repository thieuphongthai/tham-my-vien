const User = require('../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Service = require('../models/Service');
const ServiceNote = require('../models/ServiceNote');
const Status = require('../models/Status');
const Customer = require('../models/Customer');







class UserController {

	getUserDashboard(req, res, next) {
		res.render('users/user');
	}

	//CUSTOMER
	getUserCustomer(req, res, next) {
		Customer.find({})
			.then(customers => {
				res.render('users/customer/user-customer', {
					customers: multipleMongooseToObject(customers)
				});
			})
			.catch(next);
	}

	//SERVICE-NOTE
	getUserServiceNote(req, res, next) {
		Promise.all([ServiceNote.find({}), Customer.find({}), User.find({}), Status.find({}), Service.find({})])
			.then(([serviceNotes, customers, users, status, services]) => {
				res.render('users/service-note/user-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					customers: multipleMongooseToObject(customers),
					users: multipleMongooseToObject(users),
					status: multipleMongooseToObject(status),
					services: multipleMongooseToObject(services),
				});
			})
			.catch(next);
	}

	getUserService(req, res, next) {
		Service.find({})
			.then(services => {
				res.render('users/service/user-service', {
					services: multipleMongooseToObject(services)
				});
			})
			.catch(next);
	}

}

module.exports = new UserController;
