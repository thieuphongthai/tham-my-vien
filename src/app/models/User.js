const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	birth: String,
	gender: String,
	phoneNumber: Number,
    email: String,
  	address: String,
	image: String,
	department_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department"
		}
	],
    role_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	],
    account: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Account"
		}
	],
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('User', User);