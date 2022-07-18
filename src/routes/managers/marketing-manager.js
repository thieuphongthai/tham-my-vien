const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/marketing-controller/EmployMarketingController');
const validateUploadImage = require('../../middleware/validateUploadImage');




//Manager
router.post('/manager/customer', validateUploadImage.upload, MarketingController.createCustomer);
router.get('/manager/customer', MarketingController.showMNGCustomer);
router.get('/manager/:id/customer-detail', MarketingController.getMNGOneMarketingCustomer)
router.post('/manager/:id/customer-detail', MarketingController.createComment);
router.get('/manager', MarketingController.getMNGMarketingDashboard);


module.exports = router;