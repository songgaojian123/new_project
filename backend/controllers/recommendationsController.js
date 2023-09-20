const Recommendation = require('../models/recommendations');
const User = require('../models/user');

// Get recommendations for a user
exports.getRecommendationsForUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const recommendation = await Recommendation.findOne({ userID: userId }).populate('clothingIDs');
        res.status(200).json(recommendation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// List all available recommendations (Admin only)
exports.getAllRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.find();
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a new recommendation (Admin only)
exports.addRecommendation = async (req, res) => {
    const recommendation = new Recommendation(req.body);
    try {
        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a recommendation (Admin only)
exports.updateRecommendation = async (req, res) => {
    try {
        const updatedRecommendation = await Recommendation.findByIdAndUpdate(req.params.recommendationId, req.body, { new: true });
        res.status(200).json(updatedRecommendation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a recommendation (Admin only)
exports.deleteRecommendation = async (req, res) => {
    try {
        await Recommendation.findByIdAndDelete(req.params.recommendationId);
        res.status(200).json({ message: 'Recommendation deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
