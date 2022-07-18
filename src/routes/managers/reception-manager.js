const express = require('express');
const router = express.Router();
const ReceptionController = require('../../app/controllers/ReceptionController');
const validateUploadImage = require('../../middleware/validateUploadImage');


module.exports = router;