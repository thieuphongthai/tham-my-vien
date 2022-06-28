const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Position = new Schema({
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

module.exports = mongoose.model('Position', Position);