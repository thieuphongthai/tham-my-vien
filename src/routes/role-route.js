const express = require('express');
const router = express.Router();
const RoleController = require('../app/controllers/RoleController');

// router.delete('/:id', RoleController.deleteRoleDashboard);
// router.put('/:id', RoleController.putRoleDashboard);
router.post('/', RoleController.postRoleDashboard);
router.get('/', RoleController.getRoleDashboard);

module.exports = router;