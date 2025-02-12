import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './dashboard.css'; 
const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      const userEmail = Cookies.get('userSession'); 
      console.log(userEmail)
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        if (response.ok) {
          const allOrders = await response.json();
     
          const userOrder = allOrders.find(order => order.email === userEmail);
          if (userOrder) {
            setOrder(userOrder);
          } else {
            setError('Order not found for the given email.');
          }
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (e) {
        setError('There was an error accessing the orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    
    <>
<nav class="navbar">
  <ul class="nav-links">
    <li><a href="/" class="nav-link">Home</a></li>
    <li><a href="/logout" class="nav-link">Logout</a></li>
  </ul>
</nav>

    <div className="order-details-container">
    

      <h1>Order Details</h1>
      {order ? (
        <>
        
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          {}
        </>
      ) : (
        <p>Order details not found.</p>
      )}
    </div>
    </>
  );
};

export default OrderDetailsPage;
