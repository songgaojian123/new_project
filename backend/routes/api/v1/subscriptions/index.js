const express = require('express');
const router = express.Router();
const subscriptionsController = require('../../../../controllers/subscriptionsController');
const { authenticateToken, isAdmin } = require('../../../../middlewares');  // Assuming you have an isAdmin middleware

router.get('/', subscriptionsController.getAllSubscriptions);
router.get('/:subscriptionId', subscriptionsController.getSubscriptionById);

// Admin only routes
router.post('/', authenticateToken, isAdmin, subscriptionsController.addSubscription);
router.put('/:subscriptionId', authenticateToken, isAdmin, subscriptionsController.updateSubscription);
router.delete('/:subscriptionId', authenticateToken, isAdmin, subscriptionsController.deleteSubscription);

module.exports = router;
