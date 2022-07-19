const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/marketing-controller/EmployMarketingController');
const validateUploadImage = require('../../middleware/validateUploadImage');

//Employ
router.patch('/customers/:id/comment', MarketingController.createComment);
// router.get('/customers/:id/detail', MarketingController.showCustomerDetail)
// router.put('/customers/:id/edit', validateUploadImage.upload, MarketingController.editCustomer);
// router.get('/customers/:id/edit', EmployBusinessController.showCustomerEdit);
router.post('/customers/create', validateUploadImage.upload, MarketingController.createCustomer);
// router.get('/customers/create', MarketingController.showCustomerCreate);
router.get('/customers', MarketingController.showCustomer);
// router.get('/', MarketingController.showDashboard);


module.exports = router;