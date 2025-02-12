import React from 'react';
import './css/NavigationBar.css'; 
import img from './images/logo.png';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const userEmail = Cookies.get('userSession'); // Check if user is signed in
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('userSession'); // Remove user session cookie
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <img src={img} alt="Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/promotions">PROMOTIONS</Link></li>
        <li><Link to="/menu">MENU</Link></li>
        {!userEmail && <li><Link to="/admin-login">ADMIN</Link></li>} {/* Admin link only for non-logged users */}
        <li className="cart-link">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </li>
        <li><Link to="/contact">CONTACTUS</Link></li>
      </ul>
      <div className="sign-in">
        {userEmail ? (
          <>
            <button>
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button>
            <Link to="/login">Sign in</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
