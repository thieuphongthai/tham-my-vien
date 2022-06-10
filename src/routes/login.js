const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');
const managerController = require('../app/controllers/ManagerController');

// router.get('/manger', managerController.getManagerDashboard);
router.post('/', loginController.postLogin);
router.get('/', loginController.getLogin);

module.exports = router;