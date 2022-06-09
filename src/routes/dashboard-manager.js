const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const managerController = require('../app/controllers/ManagerController');

app.use('/dashboard-manager')

module.exports = router;