import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import NextButton from '../components/NextButton';
import '../css/Receipt.css';

export default function ReceiptPage() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  // Load booking data from sessionStorage
  useEffect(() => {
    // Get all necessary data from sessionStorage
    const selectedRoute = sessionStorage.getItem('selectedRoute');
    const selectedPassengers = sessionStorage.getItem('selectedPassengers');
    const selectedDate = sessionStorage.getItem('selectedDate');
    const selectedCabin = sessionStorage.getItem('selectedCabin');
    const passengers = sessionStorage.getItem('passengers');
    const mealPackage = sessionStorage.getItem('mealPackage') === 'true';

    // Parse the data
    const routeData = selectedRoute ? JSON.parse(selectedRoute) : null;
    const passengersCount = selectedPassengers ? JSON.parse(selectedPassengers) : null;
    const cabinData = selectedCabin ? JSON.parse(selectedCabin) : null;
    const passengersData = passengers ? JSON.parse(passengers) : [];

    // Calculate totals
    const basePrice = cabinData?.price || 0;
    const mealPrice = mealPackage ? 250 * (passengersCount?.adults + passengersCount?.children) : 0;
    const totalPassengers =
      (passengersCount?.adults || 0) +
      (passengersCount?.children || 0) +
      (passengersCount?.infants || 0) +
      (passengersCount?.pensioners || 0) +
      (passengersCount?.students || 0);

    const totalPrice = basePrice + mealPrice;

    setBookingData({
      route: routeData,
      passengers: passengersData,
      passengersCount,
      date: selectedDate,
      cabin: cabinData,
      mealPackage,
      totalPrice,
      totalPassengers,
      bookingReference:
        'HAV-' +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0'),
    });
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleTimeString('no-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle booking another trip
  const handleBookAnother = () => {
    navigate('/search');
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <Navbar />
      <BackButton />
      <ProgressBar activeStep={8} /> {/* Final step in the process */}
      <div className="receipt-section">
        <h1 className="receipt-title">Booking Confirmation</h1>

        <div className="receipt-card">
          {/* Route display with arrow - top section, full width */}
          <div className="route-display">
            <div className="port">
              <div className="port-name">{bookingData.route?.departurePort}</div>
              <div className="port-date">
                {formatDate(bookingData.date)}
                <br />
                {formatTime(bookingData.date)}
              </div>
            </div>

            <div className="arrow">→</div>

            <div className="port">
              <div className="port-name">{bookingData.route?.arrivalPort}</div>
              <div className="port-date">
                {formatDate(bookingData.route?.arrivalTime)}
                <br />
                {formatTime(bookingData.route?.arrivalTime)}
              </div>
            </div>
          </div>

          {/* Two-column layout for the rest of the content */}
          <div className="two-column-layout">
            {/* Left column */}
            <div className="column">
              {/* Travel details */}
              <div className="detail-group">
                <div className="detail-heading">Travel Details</div>

                <div className="detail-row">
                  <div className="detail-label">Booking reference</div>
                  <div className="detail-value">{bookingData.bookingReference}</div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Cabin type</div>
                  <div className="detail-value">
                    {bookingData.cabin?.category} ({bookingData.cabin?.type})
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Meal package</div>
                  <div className="detail-value">{bookingData.mealPackage ? 'Yes' : 'No'}</div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Total passengers</div>
                  <div className="detail-value">{bookingData.totalPassengers}</div>
                </div>
              </div>

              {/* Price summary */}
              <div className="price-summary">
                <div className="detail-heading">Price Summary</div>

                <div className="price-row">
                  <div className="detail-label">Cabin ({bookingData.cabin?.category})</div>
                  <div className="detail-value">{bookingData.cabin?.price} NOK</div>
                </div>

                {bookingData.mealPackage && (
                  <div className="price-row">
                    <div className="detail-label">Meal package</div>
                    <div className="detail-value">
                      {250 *
                        (bookingData.passengersCount?.adults +
                          bookingData.passengersCount?.children)}{' '}
                      NOK
                    </div>
                  </div>
                )}

                <div className="total-row">
                  <div>Total</div>
                  <div>{bookingData.totalPrice} NOK</div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="column">
              {/* Passengers section */}
              <div className="passengers-group">
                <div className="detail-heading">Passengers</div>

                {bookingData.passengers.map((passenger, index) => (
                  <div className="passenger-row" key={index}>
                    <div className="passenger-details">
                      <div className="passenger-name">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="passenger-info">
                        {passenger.gender} • {passenger.dateOfBirth}
                      </div>
                    </div>
                    <div className="passenger-type">
                      {index < bookingData.passengersCount?.adults
                        ? 'Adult'
                        : index <
                            bookingData.passengersCount?.adults +
                              bookingData.passengersCount?.children
                          ? 'Child'
                          : 'Infant'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact information section */}
              <div className="detail-group">
                <div className="detail-heading">Contact Information</div>

                <div className="detail-row">
                  <div className="detail-label">Email</div>
                  <div className="detail-value">
                    {bookingData.passengers[0]?.email || 'Not provided'}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Phone</div>
                  <div className="detail-value">
                    {bookingData.passengers[0]?.countryCode || ''}{' '}
                    {bookingData.passengers[0]?.phoneNumber || 'Not provided'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Using the NextButton component instead of custom buttons */}
      <NextButton isEnabled={true} route="/choosepayment" />
    </div>
  );
}
