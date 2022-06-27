const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	name: String,
	birth: String,
	gender: String,
	phone: Number,
    email: String,
  	address: String,
	image: {
		type: mongoose.Schema.Types.Decimal128
	},
	password: String,
	department: String,
	position: String,
	userName: {
		type: String,
		unique: true	
	},
  	email: {
		type: String,
		unique: true
	},
  	password: String,
	role: {
		type: String,
		unique: true
	} 
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);