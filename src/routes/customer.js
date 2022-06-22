const express = require('express');
const router = express.Router();
const customerController = require('../app/controllers/CustomerController');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getCustomerDashboard);

// UPDATE Customer
router.get('/:id/update', customerController.editCustomer);
router.put('/:id', customerController.updateCustomer);

module.exports = router;