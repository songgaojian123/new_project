const Order = require('../models/orders');  // Assuming the model is in a `models` directory

exports.createOrder = async (req, res) => {
    const order = new Order({
        ...req.body,
        userID: req.user._id
    });
    try {
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('clothingIDs');  // populate to get clothing details
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrderAddress = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { deliveryAddress: req.body.deliveryAddress }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
