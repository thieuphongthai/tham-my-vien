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
    account: String,
	password: String,
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
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);