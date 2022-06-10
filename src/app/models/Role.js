const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Role = new Schema({
  	roleID: String,
  	roleName: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	deletedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Role', Role);