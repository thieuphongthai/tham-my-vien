const express = require('express');
const SaleController = require('../app/controllers/SaleController');
const router = express.Router();

// [GET] SALE Employee
router.get('/employee-sale', SaleController.getSaleStaffDashboard)

// [GET] SALE Manager
router.get('/manager-sale', SaleController.getSaleManagerDashboard)

// [GET] SALE UI
router.get('/sales', SaleController.getSaleDashboard)

module.exports = router;