const router = require('express').Router();
const Orders = require('../../controllers/orders.controller.js');
const { AuthorizeUser }= require('../../middleware/auth.js');

router.get('/',AuthorizeUser, Orders.GetOrders);
router.get('/:id',AuthorizeUser,Orders.GetOrdersById);
router.put('/accept/:id',AuthorizeUser,Orders.acceptOrder);

module.exports = router;