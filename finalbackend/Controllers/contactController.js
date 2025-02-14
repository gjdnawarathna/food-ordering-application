// controllers/contactController.js
const Contact = require('../models/Contact');

exports.saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    res
      .status(201)
      .json({ message: 'Contact information saved successfully', data: savedContact });
  } catch (error) {
    console.error('Error saving contact information:', error.message);
    res
      .status(500)
      .json({ message: 'Error saving contact information', error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const message = await Contact.findByIdAndUpdate(id, { email }, { new: true });
    if (!message) {
      return res.status(404).send('Message not found.');
    }
    res.send(message);
  } catch (error) {
    console.error('Error updating message:', error.message);
    res.status(500).send('Server error while updating message.');
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).send('Message not found.');
    }
    res.send({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(500).send('Server error while deleting message.');
  }
};
