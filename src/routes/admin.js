const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const storage = require('../middleware/storage');
const helpers = require('../middleware/helpers');

// router.post('/image',  helpers.imageFilter, UserController.upload);
router.post('/', UserController.create);
router.post('/create', helpers.imageFilter, UserController.upload);
router.get('/create', UserController.getCreateDashboard);
router.get('/', UserController.getUserDashboard);
// router.post('/', managerController.postUserPassword);

module.exports = router;