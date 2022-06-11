const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/BEAUTY', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connect successfully database');
    }
    catch(error) {
		console.log('Connect failure database');
    }
}

module.exports = { connect };