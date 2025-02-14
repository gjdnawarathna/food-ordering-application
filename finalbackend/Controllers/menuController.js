// controllers/menuController.js
const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const menuItem = new MenuItem({ name, price, category, image });
    await menuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { price } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, { price }, { new: true });
    if (!updatedItem) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await MenuItem.findByIdAndDelete(itemId);
    if (!result) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.send({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};
