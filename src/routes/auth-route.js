// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const controller = require("../app/controllers/AuthController");
const rootRouter = require("./root");
const adminRouter = require("./admin")
const businessRouter = require("./departments/business")
const marketingRouter = require("./departments/marketing")
const receptionRouter = require("./departments/reception")
const operatingRouter = require("./departments/operating-room")
const saleRouter = require("./departments/sale")
const hrRouter = require("./departments/human-resource")

router.get("/root", rootRouter);
router.get("/admin", adminRouter);
router.get("/customers", [authJwt.verifyToken, authJwt.isUser], businessRouter);
router.get("/marketing", [authJwt.verifyToken, authJwt.isUser], marketingRouter);
router.get("/reception", receptionRouter);
router.get("/operating", operatingRouter);
router.get("/sale", saleRouter);
router.get("/hr", hrRouter);
router.post("/logout", controller.logout);
router.post("/", controller.postLogin);
router.get('/', controller.getLogin);

module.exports = router;