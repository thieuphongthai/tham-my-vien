const express = require('express');
const router = express.Router();
const SaleController = require('../../app/controllers/SaleController');
const validateUploadImage = require('../../middleware/validateUploadImage');


//Employ
router.post('/employ/customer', validateUploadImage.upload, SaleController.createCustomer);
router.get('/employ/customer', SaleController.showCustomer);
router.get('/employ/:id/customer-detail', SaleController.getOneSaleCustomer)
router.post('/employ/:id/customer-detail', SaleController.createComment);
router.get('/employ', SaleController.getSaleDashboard);

//Manager
router.post('/manager/customer', validateUploadImage.upload, SaleController.createCustomer);
router.get('/manager/customer', SaleController.showMNGCustomer);
router.get('/manager/:id/customer-detail', SaleController.getMNGOneSaleCustomer)
router.post('/manager/:id/customer-detail', SaleController.createComment);
router.get('/manager', SaleController.getMNGSaleDashboard);


module.exports = router;