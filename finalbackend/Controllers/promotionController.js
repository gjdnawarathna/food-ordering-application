// controllers/promotionController.js
const Promotion = require('../models/Promotion');

exports.addPromotion = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const promotion = new Promotion({ name, imageUrl });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const updateData = req.body;
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, updateData, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json(updatedPromotion);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const promotion = await Promotion.findByIdAndDelete(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
