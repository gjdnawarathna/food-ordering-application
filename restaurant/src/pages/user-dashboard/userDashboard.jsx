import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './UserDashboard.css';
import NavigationBar from '../../components/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheckCircle, faClock, faUtensils } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userEmail = Cookies.get('userSession'); 

      if (!userEmail) {
        console.error('User email not found in cookies');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/orders?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error('Error fetching orders:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FontAwesomeIcon icon={faClock} className="status-icon pending" />;
      case 'InProgress':
        return <FontAwesomeIcon icon={faUtensils} className="status-icon in-progress" />; // Preparing food
      case 'Delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon delivered" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <>
      <NavigationBar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">My Orders</h1>
        {orders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-header">
                  <span className="order-id">Order ID: {order._id}</span>
                  <span className="order-date">{new Date(order.orderDate).toLocaleString()}</span>
                </div>
                <div className="order-details">
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                  <strong>Items:</strong>
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>{item.itemName}</li>
                    ))}
                  </ul>
                  <div className="order-status">
                    <strong>Status:</strong> {getStatusIcon(order.status)} {order.status === 'InProgress' ? 'Preparing Food' : order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
