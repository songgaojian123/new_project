const express = require('express');
const router = express.Router();
const clothingController = require('../../../../controllers/clothingController');

router.get('/', clothingController.getAllClothings);
router.get('/:id', clothingController.getClothingById);
router.post('/', clothingController.addNewClothing);
router.put('/:id', clothingController.updateClothing);
router.delete('/:id', clothingController.deleteClothing);

module.exports = router;
