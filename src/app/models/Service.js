const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Service = new Schema({
	name: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Service', Service);