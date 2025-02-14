require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

// Controllers
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const menuController = require('./controllers/menuController');
const promotionController = require('./controllers/promotionController');
const orderController = require('./controllers/orderController');
const contactController = require('./controllers/contactController');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Configure Multer for uploads (if needed)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const randomNum = Math.floor(Math.random() * (999999 - 99999 + 1)) + 99999;
    cb(null, randomNum + path.extname(file.originalname));
  },
});
const upload = multer({ storage, fileFilter });

// Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//
// ============== Routes using Controllers ==============
//

// --------------------- USERS --------------------------
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/admin/users', userController.getAllUsers);
app.put('/admin/users/:userId', userController.updateUser);
app.delete('/admin/users/:userId', userController.deleteUser);

// --------------------- ADMIN (STAFF) ------------------
app.post('/admin/add/user', adminController.addStaff);
app.get('/admin/staff', adminController.getAllStaff);
app.put('/admin/staff/:userId', adminController.updateStaff);
app.delete('/admin/staff/:userId', adminController.deleteStaff);
app.post('/admin/login', adminController.login);

// --------------------- MENU ITEMS ----------------------
app.get('/menu', menuController.getMenuItems);
app.post('/admin/menu/add', upload.single('image'), menuController.addMenuItem);
app.put('/menu/:itemId', menuController.updateMenuItem);
app.delete('/menu/:itemId', menuController.deleteMenuItem);

// --------------------- PROMOTIONS ----------------------
app.post('/admin/add-promotion', upload.single('itemImage'), promotionController.addPromotion);
app.get('/promotions', promotionController.getAllPromotions);
app.put('/promotions/:promotionId', promotionController.updatePromotion);
app.delete('/promotions/:promotionId', promotionController.deletePromotion);

// --------------------- ORDERS --------------------------
app.post('/api/orders', orderController.addOrder);
app.get('/api/orders/byuser', orderController.getOrdersByUser);

app.get('/api/orders', orderController.getOrders);
app.put('/api/orders/:id', orderController.updateOrder);
app.delete('/api/orders/:id', orderController.deleteOrder);

// --------------------- CONTACT -------------------------
app.post('/api/contact', contactController.saveContact);
app.get('/api/messages', contactController.getMessages);
app.put('/api/messages/:id', contactController.updateMessage);
app.delete('/api/messages/:id', contactController.deleteMessage);

module.exports = app;
