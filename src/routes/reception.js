const express = require('express');
const router = express.Router();
const ReceptionController = require('../app/controllers/ReceptionController');

router.get('/', ReceptionController.getReceptionDashboard);

module.exports = router;