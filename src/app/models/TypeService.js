const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeService = new Schema({
	name: String,
	services: [
		{
			type: new mongoose.Schema(
				{
					comment: String,
				},
				{ timestamps: true }
			)
		}
	]
}, {
    timestamps: true
});

module.exports = mongoose.model('TypeService', TypeService);