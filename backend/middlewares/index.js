// /middlewares/index.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Assuming you have a User model

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token not provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        console.log("User from token:", user);  // Log the user object
        next();
    });
}

function checkUserExists(req, res, next) {
    const email = req.body.email;
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (user) return res.status(409).json({ message: 'Email already exists' });
        next();
    });
}

function isAdmin(req, res, next) {
    console.log("Checking admin status for user:", req.user);
    // Assuming the user object in the request (req.user) has a role property
    if (req.user && req.user.role === 'admin') {
        next();  // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
}

module.exports = {
    authenticateToken,
    checkUserExists,
    isAdmin
};
