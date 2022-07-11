const Customer = require("../models/Customer");
const { mongooseToObject, multipleMongooseToObject } = require("../../util/mongoose");
const TypeService = require("../models/TypeService");

class BusinessController {
	//BUSINESS EMPLOY
	getBusinessDashboard(req, res) {
		res.render("business/employ/business-overview");
	}

	showCustomer(req, res, next) {
		Promise.all([Customer.find({}), TypeService.find({})])
			.then(([customers, typeservices]) => {
				res.render("business/employ/business-customer", {
					customers: multipleMongooseToObject(customers),
					typeservices: multipleMongooseToObject(typeservices),
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
					// customer: mongooseToObject(customer)
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
		res.render("business/employ/business-service-note");
	}

	createServiceNote(req, res, next) {
		console.log(req.params.id);
		res.json("ok");
	}

	//BUSINESS MANAGER
	getMNGBusinessDashboard(req, res) {
		res.render("business/manager/business-overview");
	}

	showMNGCustomer(req, res, next) {
		Customer.find({})
			.then((customers) => {
				res.render("business/manager/business-customer", {
					customers: multipleMongooseToObject(customers),
				});
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

	getMNGServiceNoteDashboard(req, res) {
		res.render("business/manager/business-service-note");
	}
}

module.exports = new BusinessController();
