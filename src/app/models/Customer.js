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
	image: String,
    serviceNote_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ServiceNote"
		}
	],
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Customer', Customer);