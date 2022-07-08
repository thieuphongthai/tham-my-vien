const express = require('express');
const router = express.Router();
const OperatingController = require('../../app/controllers/OperationRoomController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.post('/doctor/customer', validateUploadImage.upload, OperatingController.createCustomer);
router.get('/doctor/customer', OperatingController.showCustomer);
router.get('/doctor/:id/customer-detail', OperatingController.getOneOperatingCustomer)
router.post('/doctor/:id/customer-detail', OperatingController.createComment);
router.get('/doctor', OperatingController.getOperatingDashboard);

//Manager
router.post('/nursing/customer', validateUploadImage.upload, OperatingController.createCustomer);
router.get('/nursing/customer', OperatingController.showNCustomer);
router.get('/nursing/:id/customer-detail', OperatingController.getNOneOperatingCustomer)
router.post('/nursing/:id/customer-detail', OperatingController.createComment);
router.get('/nursing', OperatingController.getNOperatingDashboard);


module.exports = router;