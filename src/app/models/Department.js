const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
	name: {
		type: String,
		unique: true	
	},
  	engName: {
		type: String,
		unique: true
	},
	description: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Department', Department);