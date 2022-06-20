const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
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