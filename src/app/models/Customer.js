const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	birth: String,
	gender: String,
	phoneNumber: Number,
    email: String,
  	address: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Customer', Customer);