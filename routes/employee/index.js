const router = require('express').Router();
const Employee = require('../../controllers/employee.controller.js');
const { AuthorizeUser }= require('../../middleware/auth.employee.js');

router.post('/checkin',AuthorizeUser, Employee.Checkin);
router.get('/checkin',AuthorizeUser, Employee.GetCheckin);
router.post('/checkout',AuthorizeUser, Employee.Checkout);
router.get('/checkout',AuthorizeUser, Employee.GetCheckout);

module.exports = router;