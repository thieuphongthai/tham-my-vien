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
router.post('/customer', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/customer', BusinessController.showCustomer);
router.get('/', BusinessController.getBusinessDashboard);



module.exports = router;