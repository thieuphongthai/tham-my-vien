const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceNote = new Schema({
	name: String,
    customer_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customer"
		}
	],
    user_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
    status_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Status"
		}
	],
	service_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
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