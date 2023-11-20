const router = require('express').Router();
const Employee = require('../../controllers/employee.controller.js');
const authEmployee = require('../../middleware/auth.employee.js');
const authAdmin = require('../../middleware/auth.admin.js');

router.post('/', Employee.create);

module.exports = router;