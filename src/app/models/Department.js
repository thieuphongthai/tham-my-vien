const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
  	departmentName: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Department', Department);