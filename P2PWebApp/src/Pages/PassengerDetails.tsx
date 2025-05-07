import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import NextButton from '../components/NextButton';
import '../css/PassengersDetails.css';

export default function PassengerPage() {
  // Get passenger counts from sessionStorage
  const [passengerCounts, setPassengerCounts] = useState(() => {
    const stored = sessionStorage.getItem('selectedPassengers');
    return stored ? JSON.parse(stored) : { adults: 1, children: 0, infants: 0 };
  });

  // Calculate total number of passengers
  const totalPassengers =
    passengerCounts.adults + passengerCounts.children + passengerCounts.infants;

  // State for currently selected passenger
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  // State for all passengers
  const [allPassengers, setAllPassengers] = useState(() => {
    const stored = sessionStorage.getItem('passengers');
    if (stored) {
      return JSON.parse(stored);
    } else {
      // Initialize array with empty passenger objects based on total count
      return Array(totalPassengers)
        .fill()
        .map(() => ({
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          citizenship: '',
          email: '',
          countryCode: '',
          phoneNumber: '',
        }));
    }
  });

  // State for form data of current passenger
  const [formData, setFormData] = useState(() => {
    return (
      allPassengers[currentPassengerIndex] || {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        citizenship: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
      }
    );
  });

  // State to track validity of all passenger forms
  const [allPassengersValid, setAllPassengersValid] = useState(false);

  // Destructure values from formData for easier access
  const { firstName, lastName, gender, dateOfBirth, citizenship, email, countryCode, phoneNumber } =
    formData;

  // Save the current passenger data when it changes
  useEffect(() => {
    // Create a new array with the updated passenger data
    const updatedPassengers = [...allPassengers];
    updatedPassengers[currentPassengerIndex] = formData;

    // Update the state
    setAllPassengers(updatedPassengers);

    // Save to sessionStorage
    sessionStorage.setItem('passengers', JSON.stringify(updatedPassengers));

    // Check if all passenger forms are valid
    const allValid = updatedPassengers.every(
      (passenger) =>
        passenger.firstName?.trim() !== '' &&
        passenger.lastName?.trim() !== '' &&
        passenger.gender !== '' &&
        passenger.dateOfBirth?.trim() !== '' &&
        passenger.citizenship?.trim() !== '',
    );

    setAllPassengersValid(allValid);
  }, [formData]); // Only depend on formData changes

  // Update form data when passenger selection changes
  useEffect(() => {
    setFormData(
      allPassengers[currentPassengerIndex] || {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        citizenship: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
      },
    );
  }, [currentPassengerIndex, allPassengers]);

  // Generic change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Special handler for radio buttons
  const handleGenderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  // Get passenger type (adult, child, infant) based on index
  const getPassengerType = (index) => {
    if (index < passengerCounts.adults) {
      return 'Adult';
    } else if (index < passengerCounts.adults + passengerCounts.children) {
      return 'Child';
    } else {
      return 'Infant';
    }
  };

  return (
    <div className="page">
      <Navbar />
      <BackButton />
      <ProgressBar activeStep={7} />
      <div className="passenger-details-section">
        {/* Passenger selector */}
        <div className="passenger-selector">
          <span className="passenger-selector-label">Passenger:</span>
          <div className="passenger-buttons">
            {Array(totalPassengers)
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  className={currentPassengerIndex === index ? 'active' : ''}
                  onClick={() => setCurrentPassengerIndex(index)}
                >
                  {getPassengerType(index)} {index + 1}
                </button>
              ))}
          </div>
        </div>

        <div className="form-row">
          {/* First name */}
          <div className="form-group">
            <div className="label-column">First name</div>
            <div className="input-column">
              <input
                type="text"
                name="firstName"
                value={firstName || ''}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>
          </div>

          {/* Last name */}
          <div className="form-group">
            <div className="label-column">Last name</div>
            <div className="input-column">
              <input
                type="text"
                name="lastName"
                value={lastName || ''}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          {/* Gender */}
          <div className="form-group">
            <div className="label-column">Gender</div>
            <div className="input-column">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'Male'}
                    onChange={() => handleGenderChange('Male')}
                  />
                  <span>Male</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'Female'}
                    onChange={() => handleGenderChange('Female')}
                  />
                  <span>Female</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'Other'}
                    onChange={() => handleGenderChange('Other')}
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>
          </div>

          {/* Date of birth */}
          <div className="form-group">
            <div className="label-column">Date of birth</div>
            <div className="input-column">
              <input
                type="text"
                name="dateOfBirth"
                value={dateOfBirth || ''}
                onChange={handleChange}
                placeholder="DD.MM.YYYY"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          {/* Citizenship */}
          <div className="form-group">
            <div className="label-column">Citizenship</div>
            <div className="input-column">
              <input
                type="text"
                name="citizenship"
                value={citizenship || ''}
                onChange={handleChange}
                placeholder="Citizenship"
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="form-group">
            <div className="label-column">E-mail</div>
            <div className="input-column">
              <input
                type="email"
                name="email"
                value={email || ''}
                onChange={handleChange}
                placeholder="E-mail address"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          {/* Country code */}
          <div className="form-group">
            <div className="label-column">Country code</div>
            <div className="input-column">
              <input
                type="text"
                name="countryCode"
                value={countryCode || ''}
                onChange={handleChange}
                placeholder="+XX"
                className="country-code-input"
              />
            </div>
          </div>

          {/* Phone number */}
          <div className="form-group">
            <div className="label-column">Phone number</div>
            <div className="input-column">
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber || ''}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>
      </div>
      <NextButton isEnabled={allPassengersValid} route="/summary" />
    </div>
  );
}
