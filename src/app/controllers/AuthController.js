// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const config = require("../config/auth.config");
const Account = require('../models/Account');
const Role = require('../models/Role');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const account = new Account({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    account.save((err, account) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.role) {
            Role.find(
                {
                    name: { $in: req.body.role },
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    account.role = role.map((role) => role._id);
                    account.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "manager" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                account.role = [role._id];
                account.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    Account.findOne({
        username: req.body.username,
    })
    .populate("roles", "-__v")
    .exec((err, account) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!account) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        var authorities = [];
        for (let i = 0; i < account.role.length; i++) {
            authorities.push("ROLE_" + account.role[i].name.toUpperCase());
        }
        req.session.token = token;
        res.status(200).send({
            id: account._id,
            userName: account.username,
            email: account.email,
            role: authorities,
        });
    });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};