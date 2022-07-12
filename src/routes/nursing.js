const express = require('express');
const router = express.Router();
const BusinessController = require('../app/controllers/BusinessController');

router.get('/', BusinessController.getBusinessDashboard)

module.exports = router;