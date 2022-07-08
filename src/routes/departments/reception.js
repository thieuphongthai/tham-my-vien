const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/ReceptionController');
const validateUploadImage = require('../../middleware/validateUploadImage');


router.post('/customer', validateUploadImage.upload, ReceptionController.createCustomer);
router.get('/customer', ReceptionController.showCustomer);
router.get('/:id/customer-detail', ReceptionController.getOneReceptionCustomer)
router.post('/:id/customer-detail', ReceptionController.createComment);
router.get('/', ReceptionController.getReceptionDashboard);

module.exports = router;