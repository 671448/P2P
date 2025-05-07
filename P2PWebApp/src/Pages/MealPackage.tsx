import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import '../css/MealPackage.css';
import { useNavigate } from 'react-router-dom';

export default function MealPackage() {
  const navigate = useNavigate();
  const [mealPrice, setMealPrice] = useState(0);

  useEffect(() => {
    // Calculate price, added random feature as placeholder
    const random = Math.max(100, Math.floor(Math.random() * 401));
    setMealPrice(random);
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('mealPackage', 'true');
    navigate('/passengerdetails');
  };

  const handleReject = () => {
    sessionStorage.setItem('mealPackage', 'false');
    navigate('/passengerdetails');
  };

  return (
    <div className="page">
      <Navbar />
      <BackButton />
      <ProgressBar activeStep={6} />
      <div className="meal-wrapper">
        <div className="meal-package">
          <div className="meal-package-message">
            <span>Meal Package</span>
            <span className="info-icon">
              <img src="./src/assets/info.svg" alt="Info" />
            </span>
          </div>
          <div className="meal-package-price">
            <span>{mealPrice > 0 ? `NOK ${mealPrice},-` : ''}</span>
          </div>
        </div>
        <div className="button-section">
          <button className="accept" onClick={handleAccept}>
            Add meal package
          </button>
          <button className="reject" onClick={handleReject}>
            No thank you
          </button>
        </div>
      </div>
    </div>
  );
}
