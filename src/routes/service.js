const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');

router.get('/', AdminController.getServiceDashboard);
// router.post('/', managerController.postUserPassword);

module.exports = router;