const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Promotion = require('../models/Promotion');
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/login', adminController.login);

router.get('/staff', async (req, res) => {
  try {
    const staff = await Admin.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-promotion', upload.single('itemImage'), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const promotion = new Promotion({ name, imageUrl });
    await promotion.save();

    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
