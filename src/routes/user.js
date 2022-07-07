// Nhận tài nguyên công khai và được bảo vệ

const express = require('express');
const router = express.Router();
// const authJwt = require("../middleware/authJwt");
const marketingRouter = require('../app/controllers/MarketingController');
const businessRouter = require('../app/controllers/BusinessController');
const receptionRouter = require('../app/controllers/ReceptionController');
const operatingRoomRouter = require('../app/controllers/OperationRoomController');
const humanResourceRouter = require('../app/controllers/HRController');
const managerRouter = require('../app/controllers/ManagerController');
const UserController = require('../app/controllers/UserController');

router.get('/', UserController.getUserDashboard)

router.get('/customer', UserController.getUserCustomer)

router.get('/service', UserController.getUserService)

router.get('/service-note', UserController.getUserServiceNote)



router.get("/marketing", marketingRouter.getMarketingDashboard);
router.get("/business", businessRouter.getBusinessDashboard);
router.get("/reception", receptionRouter.getReceptionDashboard);
router.get("/operating-room", operatingRoomRouter.getDoctorDashboard);
router.get("/human-resource", humanResourceRouter.getHRDashboard);
router.get('/manager', managerRouter.getManagerDasboard)

module.exports = router;