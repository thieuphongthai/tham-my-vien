const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
	userName: String,
  	email: String,
  	password: String,
	role: String,
	uid: [
		{

			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}
	],
}, {
	timestamps: true
});

module.exports = mongoose.model('Account', Account);