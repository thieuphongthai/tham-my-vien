const express = require('express');
const router = express.Router();
const MarketingController = require('../app/controllers/MarketingController');

// [GET] Manager Marketing
router.get('/manager-marketing', MarketingController.getManagerMakertingDashboard)

// [GET] Staff Marketing
router.get('/employee-marketing', MarketingController.getStaffMarketingDashboard)

// [GET] Marketing UI
router.get('/', MarketingController.getMarketingDashboard)

module.exports = router;