const express = require('express');
const router = express.Router();
const RootController = require('../app/controllers/RootController');


router.get('/operating-room', RootController.getRootOperatingRoomDashboard);
router.get('/reception', RootController.getRootReceptionDashboard);
router.get('/business', RootController.getRootBussinessDashboard);
router.get('/marketing', RootController.getRootMarketingDashboard);
router.get('/user', RootController.getRootUserDashboard);
router.get('/account', RootController.getRootAccountDashboard);
router.get('/customer', RootController.getRootCustomerDashboard);
router.get('/department', RootController.getRootDepartmentDashboard);
router.get('/role', RootController.getRootRoleDashboard);
router.get('/service-note', RootController.getRootServiceNoteDashboard);
router.get('/service', RootController.getRootServiceDashboard);
router.get('/status', RootController.getRootStatusDashboard);
router.get('/', RootController.getRootDashboard);

module.exports = router;