const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');


// router.get('/status', AdminController.getStatusDashboard);
// router.get('/service', AdminController.getServiceDashboard);
// router.get('/role', AdminController.getRoleDashboard);
// router.get('/department', AdminController.getDepartmentDashboard);
// router.get('/account', AdminController.getAccountDashboard);
// router.get('/user', AdminController.getUserDashboard);

// router.post('/', AdminController.create);
router.get('/', AdminController.getAdminDashboard);
// router.post('/', managerController.postUserPassword);

module.exports = router;