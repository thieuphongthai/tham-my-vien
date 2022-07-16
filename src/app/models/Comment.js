const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
    comment: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', Comment);

