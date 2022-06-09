const express = require('express');
const app = require('express/lib/response');
const router = express.Router();
const managerController = require('../app/controllers/ManagerController');

app.use('/dashboard-manager', managerController())

module.exports = router;