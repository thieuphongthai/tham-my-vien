const express = require('express');
const router = express.Router();
const MarketingController = require('../app/controllers/MarketingController');

router.get('/', MarketingController.getMarketingDashboard)

module.exports = router;