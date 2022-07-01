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
router.put('/:id', AdminController.updateCustomer)
router.delete('/:id', AdminController.destroyCustomer)


//END CUSTOMER

//USER
router.get('/user', AdminController.getAdminUser)
router.post('/user', AdminController.createUser)
router.delete('/:id', AdminController.destroyUser)
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
router.delete('/:id', AdminController.destroyServiceNote)
//END SERVICE NOTE


module.exports = router;