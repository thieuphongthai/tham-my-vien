const express = require('express');
const router = express.Router();
const ReceptionController = require('../app/controllers/ReceptionController');

// [GET] RECEPTION Employee
router.get('/manager-reception', ReceptionController.getReceptionManagerDashboard)

// [GET] RECEPTION Manager
router.get('/employee-reception', ReceptionController.getReceptionStaffDashboard)

// [GET] RECEPTION UI
router.get('/', ReceptionController.getReceptionDashboard);

module.exports = router;