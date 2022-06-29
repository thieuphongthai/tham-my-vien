const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceNote = new Schema({
	name: String,
    customer: [
		{
			type: String,
			ref: "Customer"
		}
	],
    user: [
		{
			type: String,
			ref: "User"
		}
	],
    status: [
		{
			type: String,
			ref: "Status"
		}
	],
	service: [
		{
			type: String,
			ref: "Service"
		}
	],
    comments: [
		{
			comment: String
		}
	],
	appointmentDate: Date,
}, {
	timestamps: true
});

module.exports = mongoose.model('ServiceNote', ServiceNote);