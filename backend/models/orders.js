const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    recipientName: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    }
});

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clothingIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing'
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: Date,
    returnDate: Date,
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Shipped", "Returned", "Completed"],
        default: "Pending"
    },
    deliveryAddress: {
        type: addressSchema,
        required: true
    }
}, {
    timestamps: true  // Automatically create `createdAt` and `updatedAt` fields
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
