const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');



class ReceptionController {
    getReceptionDashboard(req, res) {
        res.render('reception/reception-overview');
    }

    showServiceNote(req, res, next) {
        Promise.all([ServiceNote.find({}).sort({ schedule: 1 }), User.find({ department: "Phẩu thuật", position: "Bác sĩ" })])
            .then(([serviceNotes, users]) => {
                res.render('reception/employ/reception-schedule', {
                    serviceNotes: multipleMongooseToObject(serviceNotes),
                    users: multipleMongooseToObject(users),
                    title: "Quản lý dịch vụ"
                });

            })
            .catch(next);
    }

    pushPerformer(req, res, next) {
        Promise.all([
            ServiceNote.delete({_id: req.params.id }), 
            ServiceNote.findByIdAndUpdate({ _id: req.params.id }, 
                { $push: { performer: req.body.performer },$set: { stored: "No" } }),
            User.updateMany({_id: req.body.userid},{$set: {state : "Busy"}})
            ])
            .then(() => res.redirect("back"))
            .catch(next);
    }

    
};


module.exports = new ReceptionController;