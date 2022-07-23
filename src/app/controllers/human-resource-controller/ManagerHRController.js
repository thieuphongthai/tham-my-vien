const Customer = require("../../models/Customer");
const Status = require("../../models/Status");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const TypeService = require("../../models/TypeService");
const ServiceNote = require('../../models/ServiceNote');
const fs = require('fs');
const appRoot = require('app-root-path');

class HRController{

    showDashboard(req, res){
        res.render('human-resource/manager/manager-overview');
    }

    showUsers(req, res, next){
        Promise.all([User.findById({_id: req.userId}), User.find({})])
            .then(([user, users]) => {
               
                        res.render('human-resource/manager/manager-users', {
                            user: mongooseToObject(user),
                            users: multipleMongooseToObject(users),
                            title: 'Quan ly nhan su'
                        });
                 

            })
            .catch(next);
    }

    getHRStaffDashboard(req, res){
        res.render('partials/sales/employee-sale');
    }
}

module.exports = new HRController;