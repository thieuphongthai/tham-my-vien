const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Permission = new Schema({
	name: {
		type: String,
		unique: true	
	},
  	engName: {
		type: String,
		unique: true
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('Permission', Permission);