const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');

router.post('/', AdminController.createRole);
router.get('/', AdminController.getRoleDashboard);

module.exports = router;