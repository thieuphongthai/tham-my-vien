const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
	userName: String,
  	email: String,
  	password: String,
	role: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	],
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Account', Account);