const express = require('express');
const router = express.Router();
const RootController = require('../app/controllers/RootController');


router.get('/operating-room', RootController.getOperatingRoomDashboard);
router.get('/reception', RootController.getReceptionDashboard);
router.get('/business', RootController.getBussinessDashboard);
router.get('/marketing', RootController.getMarketingDashboard);
router.get('/', RootController.getAdminDashboard);

module.exports = router;