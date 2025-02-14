import './LoginPage.css'; 
import burgerImage from '../../homepage/images/burger-background.png'; 
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import NavigationBar from '../../../components/navigation';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('adminSession', email, { expires: 7 });

        console.log('Admin login successful:', email);

        navigate('/admin/users'); 
      } else {
        console.log('Admin login failed:', data.message);
      }
    } catch (error) {
      console.error('There was an error during admin login:', error);
    }
  };

  return (
    <>
      <NavigationBar/>
      <div className="sign-up-page">
        <div className="sign-up-content">
          <div className="sign-up-image">
            <img src={burgerImage} alt="Burger" />
          </div>
          <div className="sign-up-form">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">


                
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
             
              <button type="submit" className="sign-up-button">Login</button>
            </form>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
