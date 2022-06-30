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

//USER
router.get('/user', AdminController.getAdminUser)
router.post('/user', AdminController.createUser)
//END USER

//DEPARTEMENT
router.get('/department', AdminController.getAdminDepartment)
//END DEPARTMENT

//ACCOUNT
router.get('/account', AdminController.getAdminAccount)
router.post('/account', AdminController.createAccount)
router.get('/:id/accountedit', AdminController.editAccount)
//END ACCOUNT

//ROLES
router.get('/role', AdminController.getAdminRole)
//END ROLES

//POSITION
router.get('/position', AdminController.getAdminPosition)
//END POSITION

//SERVICE NOTE
router.get('/service-note', AdminController.getAdminServiceNote)
router.post('/service-note', AdminController.creatAdminServiceNote)
//END SERVICE NOTE

//test
router.get('/test-service-note', AdminController.getServiceNoteTest)
//end test
module.exports = router;