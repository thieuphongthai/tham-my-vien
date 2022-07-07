const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	birth: String,
	gender: String,
	phone: Number,
	email: String,
	address: String,
	description: String,
	image: String,
	comments: [
		{
			type: new mongoose.Schema(
				{
					comment: String,
				},
				{ timestamps: true }
			)
		}
	]
}, {
	timestamps: true
});

module.exports = mongoose.model('Customer', Customer);