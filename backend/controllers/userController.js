const User = require('../models/user');  // Assuming the model is in a `models` directory
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    });
    res.status(200).json({ token: token });
};

exports.setSubscriptionLevel = async (req, res) => {
    const userId = req.user._id;
    const { subscriptionLevel } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { subscriptionLevel: subscriptionLevel });
        res.status(200).json({ message: 'Subscription level updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.setBodyMeasurements = async (req, res) => {
    const userId = req.user._id;

    try {
        await User.findByIdAndUpdate(userId, { bodyMeasurements: req.body });
        res.status(200).json({ message: 'Body measurements updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.setPreferences = async (req, res) => {
    const userId = req.user._id;

    try {
        await User.findByIdAndUpdate(userId, { preferences: req.body });
        res.status(200).json({ message: 'Preferences updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.promoteToAdmin = async (req, res) => {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.status(200).json({ message: 'User promoted to admin successfully' });
};


// Other functions like getRecommendations, addToOrder, etc., should be added based on the related logic and other models.
