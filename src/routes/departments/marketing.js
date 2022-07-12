const express = require('express');
const router = express.Router();
const MarketingController = require('../../app/controllers/MarketingController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.post('/employ/customer', validateUploadImage.upload, MarketingController.createCustomer);
router.get('/employ/customer', MarketingController.showCustomer);
router.get('/employ/:id/customer-detail', MarketingController.getOneMarketingCustomer)
router.post('/employ/:id/customer-detail', MarketingController.createComment);
router.get('/employ', MarketingController.getMarketingDashboard);

//Manager
router.post('/manager/customer', validateUploadImage.upload, MarketingController.createCustomer);
router.get('/manager/customer', MarketingController.showMNGCustomer);
router.get('/manager/:id/customer-detail', MarketingController.getMNGOneMarketingCustomer)
router.post('/manager/:id/customer-detail', MarketingController.createComment);
router.get('/manager', MarketingController.getMNGMarketingDashboard);


module.exports = router;