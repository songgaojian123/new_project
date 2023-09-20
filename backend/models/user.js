const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] // Email format validation
    },
    password: {
        type: String,
        required: true,
        set: (passwordValue) => bcrypt.hashSync(passwordValue, 10) // Encrypt password using bcrypt
    },
    subscriptionLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    bodyMeasurements: {
        height: Number,
        weight: Number,
        collarWidth: Number,
        sleeveLength: Number,
        chestWidth: Number,
        waistWidth: Number,
        hipWidth: Number,
        shoeSize: Number,
        otherMeasurements: String
    },
    preferences: {
        fashionStyle: String,
        dislikedItems: [String],
        feedbackHistory: [String],
        savedItems: [String]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Only allow these two values for role
        default: 'user'  // By default, a user will not be an admin
    }
}, {
    timestamps: true // Automatically create `createdAt` and `updatedAt` fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
