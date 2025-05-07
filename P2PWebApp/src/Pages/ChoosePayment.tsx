import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import '../css/ChoosePayment.css';
import NextButton from '../components/NextButton';

export default function Payment() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentOption, setPaymentOption] = useState('full'); // Default to 'full' as shown in screenshot
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Get data from sessionStorage
    const selectedCabin = sessionStorage.getItem('selectedCabin');
    const mealPackage = sessionStorage.getItem('mealPackage') === 'true';
    const passengers = sessionStorage.getItem('selectedPassengers');

    if (selectedCabin) {
      const cabinData = JSON.parse(selectedCabin);
      const passengersData = passengers
        ? JSON.parse(passengers)
        : { adults: 1, children: 0, infants: 0 };

      // Calculate base price from cabin
      const basePrice = cabinData.price || 15435; // Default price if not available

      // Calculate meal package cost if applicable (250 NOK per adult and child)
      const mealCost = mealPackage ? 250 * (passengersData.adults + passengersData.children) : 0;

      // Total price
      const total = basePrice + mealCost;
      setTotalPrice(total);

      // Set deposit (around 35-40% of total)
      setDepositAmount(Math.round(total * 0.37));

      // Set final payment amount
      setFinalAmount(total - Math.round(total * 0.37));
    }
  }, []);

  // Update form validity when payment option or terms acceptance changes
  useEffect(() => {
    setIsFormValid(paymentOption && termsAccepted && privacyAccepted);
  }, [paymentOption, termsAccepted, privacyAccepted]);

  const handleConfirm = () => {
    if (isFormValid) {
      // Save payment option to sessionStorage
      sessionStorage.setItem('paymentOption', paymentOption);
      sessionStorage.setItem(
        'paymentAmount',
        paymentOption === 'deposit' ? depositAmount : totalPrice,
      );

      // Navigate to receipt or confirmation page
      navigate('/receipt');
    }
  };

  return (
    <div className="page">
      <Navbar />
      <BackButton />
      <ProgressBar activeStep={9} />

      <div className="payment-wrapper">
        <div className="payment-content">
          {/* Title inside the content wrapper */}
          <h1 className="payment-title">Choose your payment</h1>

          <div className="payment-options">
            {/* Deposit option */}
            <div
              className={`payment-option deposit ${paymentOption === 'deposit' ? 'selected' : ''}`}
              onClick={() => setPaymentOption('deposit')}
            >
              <div className="payment-option-info">
                <div className="payment-option-type">Deposit</div>
                <div className="payment-option-amount">NOK {depositAmount}</div>
              </div>
              <div className="radio-button">
                <div
                  className={`radio-button-inner ${paymentOption === 'deposit' ? 'selected' : ''}`}
                ></div>
              </div>
            </div>

            {/* Full payment option */}
            <div
              className={`payment-option final ${paymentOption === 'full' ? 'selected' : ''}`}
              onClick={() => setPaymentOption('full')}
            >
              <div className="payment-option-info">
                <div className="payment-option-type">Final payment</div>
                <div className="payment-option-amount">NOK {finalAmount}</div>
              </div>
              <div className="radio-button">
                <div
                  className={`radio-button-inner ${paymentOption === 'full' ? 'selected' : ''}`}
                ></div>
              </div>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="terms-section">
            <div className="terms-row" onClick={() => setTermsAccepted(!termsAccepted)}>
              <div className="terms-checkbox">
                {termsAccepted && (
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="#333" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>
              <div className="terms-text">I have read and accepted the Terms & Conditions</div>
            </div>

            <div className="terms-row" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
              <div className="terms-checkbox">
                {privacyAccepted && (
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="#333" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>
              <div className="terms-text">I have read and accepted the Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next button - enabled only when form is valid */}
      <NextButton isEnabled={isFormValid} route="/summary" />
    </div>
  );
}
