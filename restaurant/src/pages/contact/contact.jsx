import React, { useState, useEffect } from 'react';
import './ContactUs.css'; 
import NavigationBar from '../../components/navigation';

const ContactUsPage = () => {
  const [ws, setWs] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [serverResponse, setServerResponse] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const newWebSocket = new WebSocket('ws://localhost:8080');
    setWs(newWebSocket);

    newWebSocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setServerResponse(response.message);
      if (response.message === 'Contact information saved successfully') {
        console.log('Server response:', response.data);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Hide success message after 3 seconds
      } else {
        console.error('Error from server:', response.error);
      }
    };

    newWebSocket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    return () => {
      newWebSocket.close();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(formData));
    } else {
      setServerResponse('WebSocket connection is not open. Please try again later.');
    }

    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      <NavigationBar />
      <div className="contact-us-page">
        <h1>Contact Us</h1>
        {showSuccessMessage && (
          <div className="success-message">
            {serverResponse}
          </div>
        )}
        <div className="background">
          <div className="contact-us-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
