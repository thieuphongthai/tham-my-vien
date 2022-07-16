const Customer = require("../models/Customer");
const Status = require("../models/Status");
const User = require("../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../util/mongoose");
const TypeService = require("../models/TypeService");
const ServiceNote = require('../models/ServiceNote');

class BusinessController {
	//BUSINESS EMPLOY
	getBusinessDashboard(req, res, next) {
		res.render("business/employ/business-overview", {
			title: 'Bảng báo cáo'
		});
	}

	showServices(req, res, next) {
		console.log(req.body)
		// TypeService.findOne({})
	}

	showCustomer(req, res, next) {
		Promise.all([Customer.find({}), TypeService.find({}), Status.findById("62bdafa2c2815bf0e273e5a2"), User.find({ department: "Phẩu thuật" })])
			.then(([customers, typeservices, status, users]) => {
				res.render("business/employ/business-customer", {
					customers: multipleMongooseToObject(customers),
					typeservices: multipleMongooseToObject(typeservices),
					status: mongooseToObject(status),
					users: multipleMongooseToObject(users),
					title: 'Quản lý khách hàng'
				});
				users.forEach(user => console.log(user.firstName));
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
		res.redirect("back");
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
					let url = user.image.url;
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

	getOneBusinessCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then((customer) => {
				let commnetArray = customer.comments;
				commnetArray.forEach((element) => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString("en-GB", {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					});
					console.log("day", newDate);
					return newDate;
				});
				res.render("business/employ/business-customer-detail", {
					customer: mongooseToObject(customer)
				});
			})
			.catch(next);
	}

	createComment(req, res, next) {
		Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $push: { comments: { comment: req.body.comments } } }
		)
			.then(() => res.redirect("back"))
			.catch(next);
	}

	showServiceNote(req, res, next) {
		ServiceNote.find({})
			.then(serviceNotes => {
				res.render('business/employ/business-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes)
				});
			})
			.catch(next);
	}

	createServiceNote(req, res, next) {
		const serviceNote = new ServiceNote({
			customer: {
				name: req.body.name,
				birth: req.body.birth,
				gender: req.body.gender,
				email: req.body.email,
				phone: req.body.phone,
				address: req.body.address
			},
			performName: req.body.performUser,
			createName: req.body.name,
			status: req.body.status,
			service: req.body.service,
			comments: { comment: req.body.comment },
			schedule: req.body.schedule,
		});
		console.log(serviceNote);
		serviceNote.save();
		res.redirect('back');
	}

	//BUSINESS MANAGER
	getMNGBusinessDashboard(req, res) {
		res.render("business/manager/business-overview");
	}

	showMNGCustomer(req, res, next) {
		Promise.all([Customer.find({}), TypeService.find({}), Status.findById("62bdafa2c2815bf0e273e5a2"), User.find({ department: "Phẩu thuật" })])
			.then(([customers, typeservices, status, users]) => {
				res.render("business/manager/business-customer", {
					customers: multipleMongooseToObject(customers),
					typeservices: multipleMongooseToObject(typeservices),
					status: mongooseToObject(status),
					users: multipleMongooseToObject(users),
					title: 'Quản lý khách hàng'
				});
				users.forEach(user => console.log(user.firstName));
			})
			.catch(next);
	}

	getMNGOneBusinessCustomer(req, res, next) {
		Customer.findById(req.params.id)
			.then((customer) => {
				let commnetArray = customer.comments;
				commnetArray.forEach((element) => {
					var date = new Date(element.createdAt);
					var newDate = date.toLocaleString("en-GB", {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					});
					console.log("day", newDate);
					return newDate;
				});
				res.render("business/manager/business-customer-detail", {
					customer: mongooseToObject(customer),
				});
			})
			.catch(next);
	}

	showMNGServiceNote(req, res, next) {
		ServiceNote.find({})
			.then(serviceNotes => {
				res.render('business/manager/business-service-note', {
					serviceNotes: multipleMongooseToObject(serviceNotes)
				});
			})
			.catch(next);
	}

	destroyServiceNote(req, res, next) {
		console.log(req.params.id);
		ServiceNote.delete({ _id: req.params.id })
			.then(() => res.redirect("back"))
			.catch(next);
	}

	
}

module.exports = new BusinessController();
