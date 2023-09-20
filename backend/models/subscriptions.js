const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    benefits: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ""
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
