const router = require('express').Router();
const Employee = require('../../controllers/employee/employee.controller.js');
const authEmployee = require('../../middleware/auth.employee.js');

router.post('/',authEmployee, Employee.create);
router.get('/',authEmployee, Employee.getEmployeeAll);
router.get('/:id',authEmployee, Employee.getEmployeeById);
router.put('/:id',authEmployee, Employee.updateEmployee);
router.delete('/:id',authEmployee, Employee.deleteEmployee);

module.exports = router;