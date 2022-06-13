const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Role = new Schema({
  	roleName: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Role', Role);