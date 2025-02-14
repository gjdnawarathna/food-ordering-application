const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


router.post('/add', async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const menuItem = new MenuItem({ name, price, category });
    await menuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
