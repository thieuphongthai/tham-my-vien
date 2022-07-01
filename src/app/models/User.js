const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	firstName: String,
	lastName: String,
	birth: String,
	gender: String,
	phone: Number,
    email: String,
  	address: String,
	image: String,
	department: String,
	position: String,
	account: String,
	password: String,
	role: String,
	description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);