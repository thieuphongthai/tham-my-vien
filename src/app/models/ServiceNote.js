const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const ServiceNote = new Schema({
	name: String,
	customer: [
		{
			type: new mongoose.Schema(
				{
					name: String,
					birth: String,
					gender: String,
					email: String,
					phone: Number,
					address: String,
				},
				{ timestamps: true }
			),
			ref: "Customer"
		}
	],
	user: [
		{
			type: new mongoose.Schema(
				{
					createName: String,
					performName: String,
				},
				{ timestamps: true }
			),
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
	schedule: String,
	reason: String,
}, {
	timestamps: true
});

ServiceNote.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceNote', ServiceNote);