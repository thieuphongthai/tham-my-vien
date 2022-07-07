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



               

module.exports = router;