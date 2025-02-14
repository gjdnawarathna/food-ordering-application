const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (user not found).' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password).' });
    }

   
    return res.status(200).json({ 
      message: 'Login successful', 
      user: {
        _id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
exports.addStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const user = new Admin({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Admin.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }
    const admin = await Admin.findByIdAndUpdate(userId, { email }, { new: true });
    if (!admin) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', admin });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Admin.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};
