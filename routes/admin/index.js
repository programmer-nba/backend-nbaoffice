const router = require('express').Router();
const Admin = require('../../controllers/admin/admin.controller.js');
const authAdmin = require('../../middleware/auth.admin.js');

router.post('/', Admin.create);

module.exports = router;