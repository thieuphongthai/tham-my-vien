const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const storage = require('../middleware/storage');
const helpers = require('../middleware/helpers');
const AdminController = require('../app/controllers/AdminController')


router.get('/', AdminController.getAdminDashboard)

//CUSTOMER
router.get('/customer', AdminController.getAdminCustomer)
router.post('/customer', AdminController.createCustomer)
router.get('/:id/editcustomer', AdminController.editCustomer)
router.put('/:id', AdminController.updateCustomer)

//END CUSTOMER


router.get('/user', AdminController.getAdminUser)

//DEPARTEMENT
router.get('/department', AdminController.getAdminDepartment)
//END DEPARTMENT

router.get('/account', AdminController.getAdminAccount)

module.exports = router;