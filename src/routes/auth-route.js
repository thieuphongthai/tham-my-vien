// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const controller = require("../app/controllers/AuthController");
const rootRouter = require("./root");
// const adminRouter = require("./admin");
const marketingRouter = require("./departments/marketing");
const receptionRouter = require("./departments/reception");
const operatingRouter = require("./departments/operating-room");
const hrRouter = require("./departments/human-resource");
const BusinessController = require('../app/controllers/BusinessController');
const validateUploadImage = require('../middleware/validateUploadImage');
const AdminController = require('../app/controllers/AdminController')
const UserController = require('../app/controllers/UserController')


router.get("/root", rootRouter);

router.get("/user/customers", UserController.getUserCustomer)
router.post("/user/customers", UserController.createCustomer)

/*Amin Start*/
router.get("/admin",  AdminController.getAdminDashboard);

router.get('/admin/customers', AdminController.getAdminCustomer)
router.post('/admin/customers', AdminController.createCustomer)
router.get('/admin/service-note', AdminController.showServiceNote);
router.post('/admin/customers/:id/service-note', AdminController.createServiceNote);
router.get('/admin/customers/:id/detail', AdminController.getOneBusinessCustomer)
router.patch('/admin/customers/:id/comment', AdminController.createComment)
router.put('/admin/customers/:id', validateUploadImage.upload, AdminController.editCustomer);


router.delete('/admin/service-note/:id', AdminController.destroyServiceNote);
router.get('/admin/service-note/trash', AdminController.trashServiceNote);
router.delete('/admin/service-note-trash/:id', AdminController.realDestroyServiceNote);
router.patch('/admin/service-note-trash/:id/restore', AdminController.restoreServiceNote);
/*Admin End*/
// [authJwt.verifyToken, authJwt.isBusinessEmploy]
/* Business Employ Start*/
router.get('/customers',  BusinessController.showCustomer);
router.post('/customers', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/service-note', BusinessController.showServiceNote);
router.post('/customers/:id/service-note', BusinessController.createServiceNote);
router.get('/customers/:id/detail', BusinessController.getOneBusinessCustomer)
router.patch('/customers/:id/comment', BusinessController.createComment)
router.put('/customers/:id', validateUploadImage.upload, BusinessController.editCustomer);
/* Business Employ End*/

/* Business Manager Start*/
router.get('/customers', BusinessController.showMNGCustomer);
router.post('/customers', validateUploadImage.upload, BusinessController.createCustomer);
router.get('/service-note', BusinessController.showMNGServiceNote);
router.post('/customers/:id/service-note', BusinessController.createServiceNote);
router.get('/customers/:id/detail', BusinessController.getMNGOneBusinessCustomer);
router.patch('/customers/:id/comment', BusinessController.createComment)
router.put('/customers/:id', validateUploadImage.upload, BusinessController.editCustomer);
router.delete('/service-note/:id', BusinessController.destroyServiceNote);
// Them route theo tung phong ban va chia theo chuc vu vao cap comment /*...*/
/* Business Manager End*/


router.get("/marketing", [authJwt.verifyToken, authJwt.isMarketingEmploy], marketingRouter);
router.get("/reception", receptionRouter);
router.get("/operating", operatingRouter);
router.get("/hr", hrRouter);


router.post("/logout", controller.logout);
router.post("/", controller.postLogin);
router.get('/', controller.getLogin);

module.exports = router;