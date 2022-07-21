const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User')

class DoctorOperationRoomController {
    //doctor
    showServiceNote(req, res, next){
		Promise.all([ServiceNote.findDeleted({ stored: "No"}).sort({ schedule: 1}), User.find({ department: "Phẩu thuật", $or:[{position: "Y tá"}, {position: "Điều dưỡng"}] })])
			.then(([serviceNotes, users]) => {
				res.render("operating/doctor/operating-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					users: multipleMongooseToObject(users),
					title: "Phiếu dịch vụ"
				});
			})
			.catch(next);
	}

}

module.exports = new DoctorOperationRoomController;
