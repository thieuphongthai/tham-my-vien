// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const Account = require('../models/Account');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const mongoose = require("../../util/mongoose");


class AuthController {
    

    getRootLogin(req, res) {
        res.render('root/root-login');
    }

    getAdminLogin(req, res) {
        res.render('admin/admin-login');
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
            res.redirect('register');
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
                    expiresIn: 30, // 10 phút
                });
                const { password, ...others } = account._doc;
                var authorities = [];
                console.log(account.role)
                authorities.push("ROLES_" + account.role.toUpperCase());
                console.log(authorities);
                req.session.token = token;
                // res.status(200).json({...others, token});
                res.status(200).render('root/root', {
                    id: account._id,
                    userName: account.userName,
                    email: account.email,
                    role: authorities,
                    token: accesstoken
                });
            })
            .catch(next);
    };

    //[GET] Login UI
	getLogin(req, res) {
		res.render("login", { layout: false });
	}

    // [POST] Login
    postLogin(req, res, next) {
        Account.findOne({email: req.body.email})
            .then( account => {
                console.log(account);
                if (!next) {
                    res.status(500).send({ message: 'Đã có lỗi xảy ra tại máy chủ' });
                    return;
                }
                if (!account) {
                    return res.status(404).send({ message: "Không tìm thấy tài khoản này" });
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
                var accessToken = jwt.sign({ id: account._id, role: account.role }, process.env.ACCESSTOKEN_KEY, {
                    expiresIn: 600, // 10 phút
                });
                const refreshToken = jwt.sign({ id: account._id, role: account.role }, process.env.REFRESHTOKEN_KEY, {
                    expiresIn: 86400, // 24 giờ
                })
                // var authorities = [];
                console.log(account.role)
                // authorities.push("ROLES_" + account.role.toUpperCase());
                // console.log(authorities);
                res.cookies = ('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                });
                // const { password, ...others } = account._doc;
                // {...others, accessToken, refreshToken});
                // res.status(200).render('root/root-dashboard', { ...others, accessToken });
                res.status(200).render('root/root', {
                    id: account._id,
                    userName: account.userName,
                    email: account.email,
                    role: account.engName,
                    // token: accesstoken
                });
            })
            .catch(next);
    };


    // Logout
    logout = async (req, res) => {
        try {
            req.session = null;
            return res.status(200).send({ message: "Bạn đã đăng xuất!" });
        } catch (err) {
            this.next(err);
        }
    };
}

module.exports = new AuthController;