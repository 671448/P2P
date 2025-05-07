import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import authService, { User } from '../contexts/AuthService';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from local storage
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Navbar />
        <div className="content">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome Aboard, {user?.firstName}!</h1>
          <p className="dashboard-subtitle">Your Havila Voyages Dashboard</p>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-content">
              <h2>My Bookings</h2>
              <p>View and manage your upcoming voyages</p>
            </div>
            <div className="card-actions">
              <Link to="/bookings" className="card-button">
                View Bookings
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>Find Departures</h2>
              <p>Browse available departures and book your next adventure</p>
            </div>
            <div className="card-actions">
              <Link to="/departure" className="card-button">
                Explore Departures
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>My Profile</h2>
              <p>View and edit your account information</p>
            </div>
            <div className="card-actions">
              <Link to="/profile" className="card-button">
                Manage Profile
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>Customer Support</h2>
              <p>Get help with bookings and account issues</p>
            </div>
            <div className="card-actions">
              <Link to="/support" className="card-button">
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <p className="activity-empty">You have no recent activity</p>
        </div>
      </div>
    </div>
  );
}
