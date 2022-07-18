const express = require('express');
const EmployBusinessController = require('../../app/controllers/business-controller/EmployBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');

/* Business Employ Start*/
router.post('/customers/:id/service-note', EmployBusinessController.createServiceNote);
router.get('/customers/service-note', EmployBusinessController.showServiceNoteCreate);
router.get('/service-note', EmployBusinessController.showServiceNote);
router.patch('/customers/:id/comment', EmployBusinessController.createComment)
router.get('/customers/:id/detail', EmployBusinessController.showCustomerDetail)
router.put('/customers/:id/edit', validateUploadImage.upload, EmployBusinessController.editCustomer);
router.get('/customers/:id/edit', EmployBusinessController.showCustomerEdit);
router.post('/customers/create', validateUploadImage.upload, EmployBusinessController.createCustomer);
router.get('/customers/create', EmployBusinessController.showCustomerCreate);
router.get('/customers', EmployBusinessController.showCustomer);
router.get('/', EmployBusinessController.showDashboard);
// router.get('/', EmployBusinessController.show404);
/* Business Employ End*/

module.exports = router;
