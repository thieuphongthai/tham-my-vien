const express = require('express');
const UserController = require('../../app/controllers/UserController');
const router = express.Router();


router.get('/user', UserController.getBusinessDashboard)

router.get('/user/customer', UserController.getBusinessCustomer)

router.get('/user/:id/customer-detail', UserController.getOneBusinessCustomer)

router.post('/user/:id/customer-detail', UserController.createComment)

module.exports = router;