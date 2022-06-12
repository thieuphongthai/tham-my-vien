const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');
const managerController = require('../app/controllers/ManagerController');
// const adminController = require('../app/controllers/AdminController');

// router.get('/', adminController.getAdminDashboard);
router.post('/', loginController.postLogin);
router.get('/', loginController.getLogin);
// router.get('/', managerController.getManagerDashboard);

module.exports = router;