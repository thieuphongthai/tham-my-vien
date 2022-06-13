const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');

router.post('/', AdminController.createAccount);
router.get('/', AdminController.getAccountDashboard);

module.exports = router;