const User = require('../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Service = require('../models/Service');
const ServiceNote = require('../models/ServiceNote');
const Status = require('../models/Status');
const Customer = require('../models/Customer');
const Comment = require('../models/Comment');






class UserController {

	getUserDashboard(req, res, next) {

		res.render('users/user');
	}

	//BUSINESS
	getBusinessDashboard(req, res, next) {
		res.render('users/user')
	}

	getBusinessCustomer(req, res, next) {
		Customer.find({})
			.then(customers => {
				res.render('users/customer/user-customer', {
					customers: multipleMongooseToObject(customers)
				});
			})
			.catch(next);
	}

	getOneBusinessCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then(customer => {
				let commnetArray = customer.comments;
				commnetArray.forEach(element => {
					var date = new Date(element.createdAt);
					// var d = date.getDate();
					// var m = date.getMonth()+1;
					var newDate = date.toLocaleString('en-GB', {day:'numeric', month: 'numeric', year:'numeric'})
					console.log('day', newDate)
					return newDate;
					// console.log('month', m)
				})
				res.render('users/customer/user-customer-detail', {
					customer: mongooseToObject(customer),
				});
			})
			.catch(next);
	}


	createComment(req, res, next) {
		Customer.findByIdAndUpdate({ _id: req.params.id }, {$push: {comments: {comment: req.body.comments}}})
			.then(() => res.redirect('back'))
			.catch(next);
	}

	// createComment(req, res, next) {
	// 	const comment = new Comment(req.body);
	// 	comment.save()
	// 		.then(() => res.redirect('customer'))
	// 		.catch(next)
	// }
	//END BUSINESS

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
