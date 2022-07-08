// Xử lý các hành động đăng ký, đăng nhập và đăng nhập
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const mongoose = require("../../util/mongoose");
const flash = require('connect-flash');


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
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.roleEngName,
        });

        if (req.body.roleEngName === '') {
            res.redirect('register');
        }
        if (req.body.roleEngName) {
            user.save((err, user) => {
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
                        user.role = role.map((role) => {
                            console.log("role", role)
                            role.engname;
                        })
                        user.save((err) => {
                            res.redirect('user');
                        });
                    }
                    );
                
                })
        }
    }

    postRootLogin(req, res, next) {
        User.findOne({email: req.body.email})
            .then( user => {
                console.log(user);
                if (!next) {
                    res.status(500).send({ message: 'Đã có lỗi xảy ra tại máy chủ' });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "Không tìm thấy người dùng này" });
                }
                // so sánh password nhập vào với password trong db
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                console.log(passwordIsValid)
                if (!passwordIsValid) {
                    return res.status(401).send('/login', { message: "Mật khẩu đăng nhập không đúng!" });
                }
                var token = jwt.sign({ id: user._id, role: user.role }, process.env.SECURITY_KEY, {
                    expiresIn: 30, // 10 phút
                });
                const { password, ...others } = user._doc;
                var authorities = [];
                console.log(user.role)
                authorities.push("ROLES_" + user.role.toUpperCase());
                console.log(authorities);
                req.session.token = token;
                // res.status(200).json({...others, token});
                res.status(200).render('root/root', {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: authorities,
                    token: accesstoken
                });
            })
            .catch(next);
    };

    //[GET] Login UI
	getLogin(req, res) {
		res.render("login");
	}

    // [POST] Login
    postLogin(req, res, next) {
        User.findOne({email: req.body.email})
            .then( user => {
                console.log(user);
                if (!next) {
                    res.status(500).send({ message: 'Đã có lỗi xảy ra tại máy chủ' });
                    return;
                }
                if (!user) {
					res.send(req.flash('message'))
                }
                // so sánh password nhập vào với password trong db
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                console.log(passwordIsValid)
                if (!passwordIsValid) {
					
					res.sendFile('login', req.session.message = {
						type: 'danger',
                        intro: 'Chúc mừng! ',
                        message: 'Bạn tạo người dùng thành công',
					})
                }
                const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESSTOKEN_KEY, {
                    expiresIn: 600, // 10 phút
                });

                const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.REFRESHTOKEN_KEY, {
                    expiresIn: 86400, // 24 giờ
                })
                // var authorities = [];
                console.log(user.role)
                // authorities.push("ROLES_" + user.role.toUpperCase());
                // console.log(authorities);
                res.cookies = ('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                });
                // const { password, ...others } = user._doc;
                // {...others, accessToken, refreshToken});
                // res.status(200).render('root/root-dashboard', { ...others, accessToken });
                res.status(200).render('users/user', {
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: user.engName,
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