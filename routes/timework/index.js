const router = require('express').Router();
const timeworks = require('../../controllers/employee/timework.controller');
const authEmployee = require('../../middleware/auth.employee');

router.post('/checkin',authEmployee, timeworks.checkin);
router.put('/checkout/:id',authEmployee, timeworks.checkout);

router.get('/', authEmployee, timeworks.getTimeworksAll);
router.get('/:id', authEmployee, timeworks.getTimeworksById);

module.exports = router;