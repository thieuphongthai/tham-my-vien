const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
const User = require('../../models/User')

class DoctorOperationRoomController {
    //doctor
    showServiceNote(req, res, next){
		ServiceNote.findDeleted({ stored: "No"}).sort({ schedule: 1})
			.then((serviceNotes) => {
				res.render("operating/doctor/operating-service-note", {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: "Phiếu dịch vụ"
				});
			})
			.catch(next);
	}

}

module.exports = new DoctorOperationRoomController;
