const Clothing = require('../models/clothings');  // Assuming the model is in a `models` directory


exports.getAllClothings = async (req, res) => {
    const {
        name, color, brand, style, availability, generalSize,
        collarWidthMin, collarWidthMax, 
        sleeveLengthMin, sleeveLengthMax, 
        chestWidthMin, chestWidthMax, 
        waistWidthMin, waistWidthMax, 
        hipWidthMin, hipWidthMax, 
        totalLengthMin, totalLengthMax,
        page = 1, limit = 10, sort
    } = req.query;

    let queryObj = {};

    // Apply filters based on query parameters
    if (name) queryObj.name = new RegExp(name, 'i');
    if (color) queryObj.color = color;
    if (brand) queryObj.brand = brand;
    if (style) queryObj.style = style;
    if (availability) queryObj.availability = availability;
    if (generalSize) queryObj["measurements.generalSize"] = generalSize;
    if (collarWidthMin && collarWidthMax) queryObj["measurements.collarWidth"] = { $gte: collarWidthMin, $lte: collarWidthMax };
    if (sleeveLengthMin && sleeveLengthMax) queryObj["measurements.sleeveLength"] = { $gte: sleeveLengthMin, $lte: sleeveLengthMax };
    if (chestWidthMin && chestWidthMax) queryObj["measurements.chestWidth"] = { $gte: chestWidthMin, $lte: chestWidthMax };
    if (waistWidthMin && waistWidthMax) queryObj["measurements.waistWidth"] = { $gte: waistWidthMin, $lte: waistWidthMax };
    if (hipWidthMin && hipWidthMax) queryObj["measurements.hipWidth"] = { $gte: hipWidthMin, $lte: hipWidthMax };
    if (totalLengthMin && totalLengthMax) queryObj["measurements.totalLength"] = { $gte: totalLengthMin, $lte: totalLengthMax };

    const totalDocuments = await Clothing.countDocuments(queryObj);
    const totalPages = Math.ceil(totalDocuments / limit);

    try {
        const clothings = await Clothing.find(queryObj)
            .limit(limit * 1) // Convert to number
            .skip((page - 1) * limit)
            .sort(sort);
        
        res.status(200).json({
            clothings: clothings,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClothingById = async (req, res) => {
    const clothingId = req.params.id;
    try {
        const clothing = await Clothing.findById(clothingId);
        if (!clothing) return res.status(404).json({ message: 'Clothing not found' });
        res.status(200).json(clothing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addNewClothing = async (req, res) => {
    const newClothing = new Clothing(req.body);
    try {
        await newClothing.save();
        res.status(201).json(newClothing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateClothing = async (req, res) => {
    const clothingId = req.params.id;
    try {
        const updatedClothing = await Clothing.findByIdAndUpdate(clothingId, req.body, { new: true });
        if (!updatedClothing) return res.status(404).json({ message: 'Clothing not found' });
        res.status(200).json(updatedClothing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteClothing = async (req, res) => {
    const clothingId = req.params.id;
    try {
        const deletedClothing = await Clothing.findByIdAndDelete(clothingId);
        if (!deletedClothing) return res.status(404).json({ message: 'Clothing not found' });
        res.status(200).json({ message: 'Clothing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;

