// Kiểm tra tên người dùng hoặc email trùng lặp
const Role = require('../app/models/Role');
const Account = require('../app/models/Account');
const { mongooseToObject } = require('../util/mongoose');
const bcrypt = require("bcryptjs");

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
    checkRole(req, res, next) {
        if (req.body.roleEngName === '' && req.body.userName === 'root') {
            const account = new Account({
                userName: req.body.userName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.roleEngName,
            });
            account.save((err, account) => {
                // Tạo tài khoản với quyền root nếu như role được bỏ trống
                Role.findOne({ name: "Gốc" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    role = mongooseToObject(role);
                    account.role = role.engName;
                    account.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    });
                });
            })
        }
        next();
    }
};

module.exports = new VerifySignUp;