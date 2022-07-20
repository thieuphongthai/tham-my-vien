const Customer = require('../../models/Customer');
const User = require('../../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const fs = require('fs');
const appRoot = require('app-root-path');

class MarketingController {

<<<<<<< HEAD
    //EMPLOY
    showDashboard(req, res, next) {
		User.findById({_id: req.userId})
			.then(user => {
				res.render('marketing/employ/employ-overview', {
					user: mongooseToObject(user)
				});
			})
			.catch(next);
    }

    showCustomer(req, res, next) {
		console.log('req', req.userId)
		Promise.all([User.findById({_id: req.userId}), Customer.find({})])
            .then(([user, customers]) => {
				// console.log('user', mongooseToObject(user))
                res.render('marketing/employ/employ-customer', {
					user: mongooseToObject(user),
                    customers: multipleMongooseToObject(customers),
					title: 'Quản lý khách hàng'
                })
            })
            .catch(next);
    }
=======
	//EMPLOY
	showDashboard(req, res) {
		res.render('marketing/employ/marketing-overview');
	}

	showCustomer(req, res, next) {
		Customer.find({})
			.then((customers) => {

				res.render('marketing/employ/employ-customer', {
					customers: multipleMongooseToObject(customers),
					title: 'Quản lý khách hàng'
				})
			})
			.catch(next);
>>>>>>> origin/vinh

	}
	showCustomerDetail(req, res, next) {
		Customer.findById(req.params.id)
			.then(customer => {
				let commnetArray = customer.comments;
				commnetArray.forEach(element => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
					console.log('day', newDate)
					return newDate;
				})
				res.render('marketing/employ/employ-customer-detail', {
					customer: mongooseToObject(customer),
					title: "Chi tiết khách hàng"
				});
			})
			.catch(next);
	}

	createCustomer(req, res, next) {
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

	editCustomer(req, res, next) {
		if (req.file) {
			Customer.findOneAndUpdate(
				{ _id: req.params.id },
				{
					firstName: req.body.filename,
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
				}
			)
				.then((customer) => {
					// console.log(customer.image.name);
					let imgCustomer = customer.image.name;
					let url = customer.image.url;
					let files = fs.readdirSync(
						appRoot + "/src/public/img/uploads/customers/"
					);
					files.filter((img) => {
						if (img === imgCustomer) {
							console.log("img user", img);
							fs.unlinkSync(url);
						}
					});
					res.redirect("back");
				})
				.catch(next);
		} else {
			console.log(req.file);
			Customer.updateOne({ _id: req.params.id }, req.body)
				.then((customer) => {
					res.redirect("back");
				})
				.catch(next);
		}
	}



	createComment(req, res, next) {
		Customer.findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: { comment: req.body.comments } } })
			.then(() => res.redirect('back'))
			.catch(next);
	}

};

module.exports = new MarketingController;

