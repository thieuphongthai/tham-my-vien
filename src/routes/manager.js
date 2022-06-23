const express = require('express');
const router = express.Router();
const managerController = require('../app/controllers/ManagerController');

//[GET] Manager UI
router.get('/', managerController.getManagerDasboard);

// CREATE Customer
router.post('/customer', managerController.createCustomer);
// READ Customer
router.get('/customer', managerController.getCustomerDashboard);
// EDIT Customer
router.get('/customer:_id', managerController.editCustomer);
//  UPDATE Customer
router.put('/customer', managerController.updateCustomer);

//[GET]EMPLOYEE UI
router.get('/user', managerController.getUserDashboard);

module.exports = router;