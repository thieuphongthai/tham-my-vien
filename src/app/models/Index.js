const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.account = require('./Account');
db.role = require('./Role');
db.ROLES = ['manager', 'employ', 'doctor', 'nurse', 'nursing'];