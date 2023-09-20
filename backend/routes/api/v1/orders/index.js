const express = require('express');
const router = express.Router();
const orderController = require('../../../../controllers/orderController');
const { authenticateToken } = require('../../../../middlewares');

router.post('/', authenticateToken, orderController.createOrder);
router.get('/me', authenticateToken, orderController.getUserOrders);
router.get('/:orderId', authenticateToken, orderController.getOrderDetails);
router.put('/:orderId/status', authenticateToken, orderController.updateOrderStatus);
router.put('/:orderId/address', authenticateToken, orderController.updateOrderAddress);

module.exports = router;
