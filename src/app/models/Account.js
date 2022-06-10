const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
  	email: String,
  	password: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Account', Account);