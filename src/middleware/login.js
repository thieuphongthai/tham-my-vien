const Account = require('../app/models/Account');
// const { multipleMongooseToObject } = require('../../util/mongoose');


// Get email, password from DB
Account.find({}, function(err, accounts){
    accounts.forEach(element => {
        var emailDB = element.email;
        var passwordDB = element.password;
        return { emailDB, passwordDB };
    });
});

// Check email, password request
// checkLogin(req, res, next)

// module.exports = { emailDB, passwordDB };