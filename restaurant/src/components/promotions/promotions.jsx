// PromotionsPage.js
import React, { useState, useEffect } from 'react';
import './css/PromotionsPage.css'; 
import NavigationBar from '../navigation';

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://localhost:5000/promotions'); 
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }
        const data = await response.json();
        console.log('Promotions received:', data); 
        setPromotions(data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <>
      <NavigationBar/>
      <div className="promotions-container">
        <h1 className="promotions-title">Current Promotions</h1>
        {promotions.length > 0 ? (
          promotions.map((promotion) => (
            <div key={promotion._id} className="promotion-card">
              <img 
                src={`http://localhost:5000/${promotion.imageUrl}`} 
                alt={`Promotion ${promotion.name}`} 
                className="promotion-image" 
              />
              <div className="promotion-details">
                <p>{promotion.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-promotions">No promotions available at the moment. Check back later!</p>
        )}
      </div>
      <div className="additional-content">
       
        <div className="footer-section">
          <footer className="footer">
          <p>&copy; 2024 Burger Haven. All Rights Reserved.</p>
          <p className="contact-info">Contact us: (123) 456-7890 | info@burgerhaven.com</p>
        </footer>
        </div>
      </div>
    </>
  );
};

export default PromotionsPage;
