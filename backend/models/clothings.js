const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    color: String,
    brand: String,
    style: String,
    availability: {
        type: String,
        enum: ['Available', 'Rented', 'Out of Stock'],
        default: 'Available'
    },
    measurements: {
        generalSize: String,
        collarWidth: Number,
        sleeveLength: Number,
        chestWidth: Number,
        waistWidth: Number,
        hipWidth: Number,
        totalLength: Number,
        otherMeasurements: String
    }
});

const Clothing = mongoose.model('Clothing', clothingSchema);
module.exports = Clothing;