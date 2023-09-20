const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clothingIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing'
    }],
    dateGenerated: {
        type: Date,
        default: Date.now
    }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
module.exports = Recommendation;
