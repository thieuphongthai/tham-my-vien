// Kiểm tra tên người dùng hoặc email trùng lặp
const Role = require('../app/models/Role');
const Account = require('../app/models/Account');

class VerifySignUp {
    checkUsernameOrEmail (req, res, next) {
        // Username
        Account.findOne({
            userName: req.body.userName
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Failed! Username is already in use!" });
                return;
            }
            // Email
            Account.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (user) {
                    res.status(400).send({ message: "Failed! Email is already in use!" });
                    return;
                }
                next();
            });
        });
    };
};

module.exports = new VerifySignUp;