// Kiểm tra tên người dùng hoặc email trùng lặp
const Role = require('../app/models/Role');
const User = require('../app/models/User');
const { mongooseToObject } = require('../util/mongoose');
const bcrypt = require("bcryptjs");

class VerifyRegister {
    checkUsernameOrEmail (req, res, next) {
        // Username
        User.findOne({
            userName: req.body.username
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Tài khoản này đã được sử dụng" });
                return;
            }
            // Email
            User.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (user) {
                    res.status(400).send({ message: "Email này đã được sử dụng" });
                    return;
                }
                next();
            });
        });
    };
    checkRole(req, res, next) {
        if (req.body.roleEngName === '' && req.body.userName === 'Root') {
            const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.roleEngName,
            });
            user.save((err, account) => {
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

module.exports = new VerifyRegister;