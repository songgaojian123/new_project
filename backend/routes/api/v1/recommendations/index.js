const express = require('express');
const router = express.Router();
const recommendationsController = require('../../../../controllers/recommendationsController');
const { authenticateToken, isAdmin } = require('../../../../middlewares');  // Assuming you have an isAdmin middleware

router.get('/me', authenticateToken, recommendationsController.getRecommendationsForUser);
router.get('/', authenticateToken, isAdmin, recommendationsController.getAllRecommendations);
router.post('/', authenticateToken, isAdmin, recommendationsController.addRecommendation);
router.put('/:recommendationId', authenticateToken, isAdmin, recommendationsController.updateRecommendation);
router.delete('/:recommendationId', authenticateToken, isAdmin, recommendationsController.deleteRecommendation);

module.exports = router;
