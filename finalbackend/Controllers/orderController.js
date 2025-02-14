// controllers/orderController.js
const Order = require('../models/orderSchema');
exports.addOrder = async (req, res) => {
  try {
    const { customerName, email, deliveryAddress, orderItems, status } = req.body;

    
    if (!Array.isArray(orderItems) || orderItems.some(item => typeof item.itemName !== 'string')) {
      return res.status(400).json({ message: 'Invalid orderItems format' });
    }

  
    const validStatuses = ['Pending', 'In Progress', 'Delivered'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const newOrder = new Order({
      customerName,
      email,
      deliveryAddress,
      orderItems,
      orderDate: new Date(),
      status: status || 'Pending', 
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.getOrders = async (req, res) => {
  try {
  
    const email = req.query.email;
    if (email) {
      const orders = await Order.find({ email });
      return res.json(orders);
    }
   
    const allOrders = await Order.find();
    res.json(allOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, deliveryAddress, status } = req.body;


    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { email, deliveryAddress, status },
      { new: true, runValidators: true } 
    );

    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).send('Server error');
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.send({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};
exports.getOrdersByUser = async (req, res) => {
  try {
    const { email } = req.query; 

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userOrders = await Order.find({ email });
    res.json(userOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
