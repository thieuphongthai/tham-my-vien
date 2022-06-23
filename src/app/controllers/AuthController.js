// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const config = require("../../config/auth");
const Account = require('../models/Account');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const mongoose = require("../../util/mongoose");


class AuthController {
    //[GET] Login
	getSignin(req, res) {
		res.render("signin", { layout: false });
	}

    getRootLogin(req, res) {
        res.render('root/root-login');
    }

    getRootRegister(req, res) {
        Role.find({})
            .then(roles => {
                res.render('root/root-register', {
                    roles: multipleMongooseToObject(roles)
                });
            })
    }

    postRootRegister(req, res) {
        const account = new Account({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.roleEngName,
        });

        if (req.body.roleEngName === '') {
            res.redirect('register',);
        }
        if (req.body.roleEngName) {
            account.save((err, account) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                Role.find({ engName: req.body.roleEngName },
                    (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        account.role = role.map((role) => {
                            console.log("role", role)
                            role.engname;
                        })
                        account.save((err) => {
                            res.redirect('account');
                        });
                    }
                    );
                
                })
        }
    }

    postRootLogin(req, res, next) {
        Account.findOne({email: req.body.email})
            .then( account => {
                console.log(account);
                if (!next) {
                    res.status(500).send({ message: 'Đã có lỗi xảy ra tại máy chủ' });
                    return;
                }
                if (!account) {
                    return res.status(404).send({ message: "Không tìm thấy người dùng này" });
                }
                // so sánh password nhập vào với password trong db
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    account.password
                );
                console.log(passwordIsValid)
                if (!passwordIsValid) {
                    return res.status(401).send({ message: "Mật khẩu đăng nhập không đúng!" });
                }
                var token = jwt.sign({ id: account._id, role: account.role }, process.env.SECURITY_KEY, {
                    expiresIn: 600, // 10 phút
                });
                var authorities = [];
                console.log(account.role)
                authorities.push("ROLES_" + account.role.toUpperCase());
                console.log(authorities);
                req.session.token = token;
                res.status(200).render('root/root', {
                    id: account._id,
                    userName: account.userName,
                    email: account.email,
                    role: authorities,
                });
            })
            .catch(next);
    };

    getSignup(req, res, next) {
        Role.find({})
			.then(roles => {
				res.render('signup', {
					roles: multipleMongooseToObject(roles),
				});
			})
			.catch(next);
	}

    // [POST] Signup
    postSignup(req, res) {
        
        const account = new Account({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role_id: { $in: req.body.role_id }
        });
        account.save((err, account) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.role_id) {
                Role.find(
                    {
                        name: { $in: req.body.role_id },
                    },
                    (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        account.role_id = role.map((role) => role._id);
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
                        res.redirect('signin');
                    });
                });
            }
        });
    };

    // [POST] Signin
    signin(req, res, next) {
        Account.findOne({
            email: req.body.email,
        })
		// .populate("roles", "-__v")
		.then( account => {
            console.log(account);
            if (!next) {
                res.status(500).send({ message: 'Bi loi roi' });
                return;
            }
            if (!account) {
                return res.status(404).send({ message: "User Not found." });
            }
            // so sánh password nhập vào với password trong db
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                account.password
            );
            console.log(passwordIsValid)
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }
            var token = jwt.sign({ id: account._id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            var authorities = [];
            req.session.token = token;
            res.status(200).render('root/root', {
                id: account._id,
                userName: account.userName,
                email: account.email,
                role: authorities,
            });
        })
		.catch(next);
    };

    // Signout
    signout = async (req, res) => {
        try {
            req.session = null;
            return res.status(200).send({ message: "You've been signed out!" });
        } catch (err) {
            this.next(err);
        }
    };
}

module.exports = new AuthController;