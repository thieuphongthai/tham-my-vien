const Customer = require("../../models/Customer");
const Status = require("../../models/Status");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const appRoot = require('app-root-path');

const User = require("../../models/User");
const Department = require("../../models/Department");
const Position = require("../../models/Position");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const appRoot = require("app-root-path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Department = require("../../models/Department");
const Position = require("../../models/Position");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const appRoot = require("app-root-path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

class HRController{

    showDashboard(req, res){
        res.render('human-resource/manager/manager-overview');
    }

    showUsers(req, res, next){
        Promise.all([User.findById({_id: req.userId}), User.find({}), Department.find({}), Position.find({})])
            .then(([user, users, departments, positions]) => {
                res.render('human-resource/manager/manager-users', {
                    user: mongooseToObject(user),
                    users: multipleMongooseToObject(users),
                    departments: multipleMongooseToObject(departments),
                    positions: multipleMongooseToObject(positions),
                    title: 'Quan ly nhan su'
                });
            })
            .catch(next);
    }

    createUser(req, res, next) {
        Promise.all([Department.find({ name: req.body.department }), Position.find({ name: req.body.position })])
            .then(([department, position]) => {
                var dpmEng = department.map(departmentEng => departmentEng.engName);
                var pstEng = position.map(positionEng => positionEng.engName);
                // departmentEng.filter()
                console.log(dpmEng[0]);
                console.log(pstEng[0]);
                if (req.file) {
                    const user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birth: req.body.birth,
                        gender: req.body.gender,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address,
                        department: req.body.department,
                        departmentEng: dpmEng[0],
                        position: req.body.position,
                        positionEng: pstEng[0],
                        description: req.body.description,
                        account: req.body.account,
                        password: bcrypt.hashSync(req.body.password, 8),
                        role: 'Người dùng',
                        image: {
                            name: req.file.filename,
                            url: req.file.path,
                        },
                    });
                    User.findOne({ account: req.body.account })
                        .then((account) => {
                            if (!account) {
                                user.save();
                            } else {
                                user.account =
                                    user.account + Math.floor(Math.random() * 100);
                                user.save();
                            }
                            // req.session.message = {
                            //     type: 'danger',
                            //     intro: 'Chúc mừng! ',
                            //     message: 'Bạn tạo người dùng thành công',
                            // }
                            res.redirect("back");
                        })
                        .catch(next);
                } else {
                    const user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birth: req.body.birth,
                        gender: req.body.gender,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address,
                        department: req.body.department,
                        departmentEng: dpmEng[0],
                        position: req.body.position,
                        positionEng: pstEng[0],
                        description: req.body.description,
                        account: req.body.account,
                        password: bcrypt.hashSync(req.body.password, 8),
                        role: 'Người dùng',
                        image: {
                            name: "",
                            url: "",
                        },
                    });
                    User.findOne({ account: req.body.account })
                        .then((account) => {
                            if (!account) {
                                user.save();
                            } else {
                                user.account =
                                    user.account + Math.floor(Math.random() * 100);
                                user.save();
                            }
                            // req.session.message = {
                            //     type: 'danger',
                            //     intro: 'Chúc mừng! ',
                            //     message: 'Bạn tạo người dùng thành công',
                            // }
                            res.redirect("back");
                        })
                        .catch(next);
                }
            })
    }

    getHRStaffDashboard(req, res){
        res.render('partials/sales/employee-sale');
    }
}

module.exports = new HRController;