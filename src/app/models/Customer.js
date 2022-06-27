const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	name: String,
	birth: String,
	gender: String,
	phone: Number,
    email: String,
  	address: String,
	image: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Customer', Customer);