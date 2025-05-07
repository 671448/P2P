import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../contexts/AuthService';
import '../css/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('Profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const user = authService.getCurrentUser();
        if (user && user.firstName) {
          setFirstName(user.firstName);
        }
      }
    };

    checkAuth();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu if screen width is over 1200px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/src/assets/logo.svg" alt="Havila Voyages Logo" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={`navbar-hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Dropdown Menu */}
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        {/* Update the Profile link to go directly to the profile page */}
        <Link to="/profile" className="navbar-link">
          {firstName}
        </Link>
        <Link to="/reservations" className="navbar-link">
          Reservations
        </Link>
        <Link to="/loyalty" className="navbar-link">
          Loyalty Program
        </Link>
      </div>
    </nav>
  );
}
