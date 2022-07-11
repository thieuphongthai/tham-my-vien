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
//BUSINESS 
//EMPLOY
router.get('/employ/service-note', BusinessController.showServiceNote);
router.post('/employ/customers/:id/service-note', BusinessController.createServiceNote);
router.patch('/employ/customers/:id/comment', BusinessController.createComment)
router.get('/employ/customers/:id/detail', BusinessController.getOneBusinessCustomer)
router.put('/employ/customers/:id', validateUploadImage.upload, BusinessController.editCustomer);
router.post('/employ/customers', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/employ/customers', BusinessController.showCustomer);
router.get('/employ', BusinessController.getBusinessDashboard);



//MANAGER
router.post('/manager/customer', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/manager/customer', BusinessController.showMNGCustomer);
router.get('/manager/:id/customer-detail', BusinessController.getMNGOneBusinessCustomer)
router.post('/manager/:id/customer-detail', BusinessController.createComment)
router.get('/manager', BusinessController.getMNGBusinessDashboard);





module.exports = router;