// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const controller = require("../app/controllers/AuthController");
const rootRouter = require("./root");
const adminRouter = require("./admin");
const businessRouter = require("./departments/business");
const marketingRouter = require("./departments/marketing");
const receptionRouter = require("./departments/reception");
const operatingRouter = require("./departments/operating-room");
const saleRouter = require("./departments/sale");
const hrRouter = require("./departments/human-resource");
const BusinessController = require('../app/controllers/BusinessController');
const validateUploadImage = require('../middleware/validateUploadImage');

router.get("/root", rootRouter);
router.get("/admin", adminRouter);

router.get('/customers/:id/detail', BusinessController.getOneBusinessCustomer)
router.post('/customers/:id/service-note', BusinessController.createServiceNote);
router.get('/service-note', BusinessController.showServiceNote);
router.patch('/customers/:id/comment', BusinessController.createComment)
router.put('/customers/:id', validateUploadImage.upload, BusinessController.editCustomer);
router.post('/customers', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/customers', BusinessController.showCustomer);


router.get("/marketing", [authJwt.verifyToken, authJwt.isUser], marketingRouter);
router.get("/reception", receptionRouter);
router.get("/operating", operatingRouter);
router.get("/sale", saleRouter);
router.get("/hr", hrRouter);


router.post("/logout", controller.logout);
router.post("/", controller.postLogin);
router.get('/', controller.getLogin);

module.exports = router;