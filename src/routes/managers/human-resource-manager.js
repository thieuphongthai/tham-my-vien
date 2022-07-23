const express = require('express');
const router = express.Router();
const ManagerHRController = require('../../app/controllers/human-resource-controller/ManagerHRController');
const validateUploadImage = require('../../middleware/validateUploadImage');

/* Business Manager Start*/
// router.delete('/service-note/:id', ManagerHRController.deleteServiceNote);
// router.patch('/customers/:id', ManagerHRController.createComment);
// router.patch('/service-note/:id', ManagerHRController.deleteServiceNote);
// router.put('/customers/:id/edit', validateUploadImage.upload, ManagerHRController.editCustomer);

// router.post('/customers/:id/service-note', ManagerHRController.createServiceNote);
// router.post('/customers', validateUploadImage.upload, ManagerHRController.createCustomer);

// router.get('/customers/:id/detail', ManagerHRController.showCustomerDetail)
// router.get('/service-note', ManagerHRController.showServiceNote);
router.get('/users', ManagerHRController.showUsers);
router.get('/', ManagerHRController.showDashboard);
// router.get('/', ManagerBusinessController.show404);
/* Business Manager End*/

module.exports = router;