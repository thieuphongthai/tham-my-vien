const express = require('express');
const BusinessController = require('../../app/controllers/BusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');


// router.get('/manager', ManagerController.getBusinessManagerDashboard);
// router.get('/manager', ManagerController.getBusinessManagerDashboard);
// router.get('/manager', ManagerController.getBusinessManagerDashboard);

// router.post('/employ/:id/customer-detail', UserController.createComment);
// router.get('/employ/:id/customer-detail', UserController.getOneBusinessCustomer);
// router.get('/employ/customer', UserController.getBusinessDashboard);
// router.get('/employ', EmployController.getBusinessEmployDashboard);
router.get('/service-note', BusinessController.getServiceNoteDashboard);
//BUSINESS 
//EMPLOY
router.post('/employ/customer', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/employ/customer', BusinessController.showCustomer);
router.get('/employ/:id/customer-detail', BusinessController.getOneBusinessCustomer)
router.post('/employ/:id/customer-detail', BusinessController.createComment)
router.get('/employ', BusinessController.getBusinessDashboard);
//MANAGER
router.post('/manager/customer', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/manager/customer', BusinessController.showMNGCustomer);
router.get('/manager/:id/customer-detail', BusinessController.getMNGOneBusinessCustomer)
router.post('/manager/:id/customer-detail', BusinessController.createComment)
router.get('/manager', BusinessController.getMNGBusinessDashboard);





module.exports = router;