const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
  	departmentName: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Department', Department);