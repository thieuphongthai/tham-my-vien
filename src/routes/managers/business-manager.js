const express = require('express');
const ManagerBusinessController = require('../../app/controllers/business-controller/ManagerBusinessController');
const router = express.Router();
const validateUploadImage = require('../../middleware/validateUploadImage');


/* Business Manager Start*/
router.delete('/customers/:id/service-note/slug', ManagerBusinessController.deleteServiceNote);
router.post('/customers/:id/service-note', ManagerBusinessController.createServiceNote);
router.get('/customers/service-note', ManagerBusinessController.showServiceNoteCreate);
router.get('/service-note', ManagerBusinessController.showServiceNote);
router.patch('/customers/:id/comment', ManagerBusinessController.createComment)
router.get('/customers/:id/detail', ManagerBusinessController.showCustomerDetail)
router.put('/customers/:id/edit', validateUploadImage.upload, ManagerBusinessController.editCustomer);
router.get('/customers/:id/edit', ManagerBusinessController.showCustomerEdit);
router.post('/customers/create', validateUploadImage.upload, ManagerBusinessController.createCustomer);
router.get('/customers/create', ManagerBusinessController.showCustomerCreate);
router.get('/customers', ManagerBusinessController.showCustomer);
router.get('/', ManagerBusinessController.showDashboard);
// router.get('/', ManagerBusinessController.show404);
/* Business Manager End*/


module.exports = router;