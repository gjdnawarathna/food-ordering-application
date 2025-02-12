import React from 'react';
import './css/HomePage.css'; 
import burgerBackground from './images/burger.png';
import burgerBackground2 from './images/burger-background.png';
import smallBurger from './images/burger-background.png';
import NavigationBar from '../../components/navigation';

const HomePage = () => {
    return (
     <>
      <NavigationBar/>
      <div className="home-page">
      <div className="small-burger-container">
          <img src={smallBurger} alt="Small Burger" className="small-burger-image animated-right" />
        </div>
        <div className="content-wrapper">
          
          <div className="text-content">
            <h1>Flavors <br /> that <br /> Satisfy,</h1>
            <h2>Moments <br /> that <br /> Delight</h2>
            <p className="description">
              Indulge in the perfect combination of taste and quality, crafted just for you.
            </p>
            <button className="cta-button">Order Now</button>
          </div>
          <div className="image-content">
            <img src={burgerBackground} alt="Delicious Burger" className="burger-image" />
            <img src={burgerBackground2} alt="Tasty Burger" className="burger-image" />
          </div>
        </div>
      
        <div className="additional-section">
          <h3>Why Choose Us?</h3>
          <ul className="features-list">
            <li>Fresh, high-quality ingredients</li>
            <li>Customizable burgers made to order</li>
            <li>Fast and reliable delivery service</li>
            <li>Friendly and welcoming atmosphere</li>
          </ul>
        </div>
        <div className="testimonials">
          <h3>What Our Customers Say</h3>
          <div className="testimonial">
            <p>"The best burgers in town! Always fresh and delicious."</p>
            <p>- Jane Doe</p>
          </div>
          <div className="testimonial">
            <p>"Excellent service and amazing flavors. Highly recommend!"</p>
            <p>- John Smith</p>
          </div>
        </div>
        <footer className="footer">
          <p>&copy; 2024 Burger Haven. All Rights Reserved.</p>
          <p className="contact-info">Contact us: (123) 456-7890 | info@burgerhaven.com</p>
        </footer>
      </div>
     </>
    );
};

export default HomePage;
