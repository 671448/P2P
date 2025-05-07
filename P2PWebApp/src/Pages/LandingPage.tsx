import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import authService from '../contexts/AuthService';
import '../css/LandingPage.css';

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const user = authService.getCurrentUser();
      if (user) {
        setUserName(user.firstName);
      }
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <h2 className="title">Welcome to</h2>
        <h2 className="title">Havila Voyages</h2>
        <p className="subtitle">Port-to-Port</p>

        {isLoggedIn ? (
          // Content for logged-in users - simplified to one button
          <div className="authenticated-content">
            <p className="welcome-message">Welcome back, {userName}!</p>
            <div className="button-section">
              <Link to="/departure" className="login-button">
                Port-to-Port
              </Link>
            </div>
          </div>
        ) : (
          // Content for guests/non-authenticated users
          <div className="button-section">
            <Link to="/login" className="login-button">
              Login
            </Link>
            <Link to="/register" className="register-button">
              Register
            </Link>
            <Link to="/departure" className="guest-link">
              Continue as guest
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
