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
router.get('/service-note', BusinessController.showServiceNote);
router.post('/customers/:id/service-note', BusinessController.createServiceNote);
router.patch('/customers/:id/comment', BusinessController.createComment)
router.get('/customers/:id/detail', BusinessController.getOneBusinessCustomer)
router.put('/customers/:id', validateUploadImage.upload, BusinessController.editCustomer);
router.post('/customers', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/customers', BusinessController.showCustomer);
router.get('/get-services', BusinessController.showServices);
router.get('/', BusinessController.getBusinessDashboard);



//MANAGER
router.post('/manager/customer', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/manager/customer', BusinessController.showMNGCustomer);
router.get('/manager/:id/customer-detail', BusinessController.getMNGOneBusinessCustomer)
router.post('/manager/:id/customer-detail', BusinessController.createComment)
router.get('/manager', BusinessController.getMNGBusinessDashboard);





module.exports = router;