const Subscription = require('../models/subscriptions');

// List all available subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get details of a specific subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.subscriptionId);
        if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a new subscription (Admin only)
exports.addSubscription = async (req, res) => {
    const subscription = new Subscription(req.body);
    try {
        const savedSubscription = await subscription.save();
        res.status(201).json(savedSubscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a subscription (Admin only)
exports.updateSubscription = async (req, res) => {
    try {
        const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.subscriptionId, req.body, { new: true });
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a subscription (Admin only)
exports.deleteSubscription = async (req, res) => {
    try {
        await Subscription.findByIdAndDelete(req.params.subscriptionId);
        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
