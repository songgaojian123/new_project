const express = require('express');
const router = express.Router();
const userController = require('../../../../controllers/userController');
const { authenticateToken, isAdmin } = require('../../../../middlewares');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/me/subscription', authenticateToken, userController.setSubscriptionLevel);
router.put('/me/measurements', authenticateToken, userController.setBodyMeasurements);
router.put('/me/preferences', authenticateToken, userController.setPreferences);
router.put('/promote/:userId', authenticateToken, isAdmin, userController.promoteToAdmin);
// Other routes like /me/recommendations, /me/orders, etc., should be added based on the related logic.

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGYwMWE3ODcwZTk1YzNmNzg2NTgwYjAiLCJlbWFpbCI6InNvbmdnYW9qaWFuQGdtYWlsLmNvbSIsImlhdCI6MTY5MzQ1NzQ1NH0.uepc075IVDb8QOTffWonmf97NolvLMk_-NxZetjx-ME