const express = require('express');
const router = express.Router();
const managerController = require('../app/controllers/ManagerController');

router.get('/', managerController.getManagerDashboard);

module.exports = router;