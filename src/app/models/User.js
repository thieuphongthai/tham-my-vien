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
	image: {
		type: mongoose.Schema.Types.Decimal128
	},
	department: String,
	position: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);