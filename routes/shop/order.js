const router = require('express').Router();
const ShopOrder = require('../../controllers/employee/shop.controller');
const authEmployee = require('../../middleware/auth.employee');

router.get('/order', authEmployee, ShopOrder.getOrderShop);
router.get('/order/:id', authEmployee, ShopOrder.getOrderShopById);
router.put('/order/accept/:id', authEmployee, ShopOrder.acceptOrderShop);
router.put('/order/submit/:id', authEmployee, ShopOrder.submitOrderShop);

module.exports = router;