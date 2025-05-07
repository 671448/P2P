import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegistrerPage from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import Departure from './Pages/Departure';
import Destination from './Pages/Destination';
import Passengers from './Pages/Passengers';
import TravelDate from './Pages/TravelDate.tsx';
import DashboardPage from './Pages/DashboardPage';
import ChooseRoute from './Pages/ChooseRoute.tsx';
import Cabin from './Pages/Cabin.tsx';
import Profile from './Pages/ProfilePage';
import MealPackage from './Pages/MealPackage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PassengerDetails from './Pages/PassengerDetails.tsx';
import Summary from './Pages/Summary.tsx';
import Choosepayment from './Pages/ChoosePayment.tsx';
import { InactivityProvider } from './contexts/InActivityTracker.tsx';

const App = () => {
  return (
    <Router>
      <InactivityProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrerPage />} />
          <Route path="/departure" element={<Departure />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/traveldate" element={<TravelDate />} />
          <Route path="/chooseroute" element={<ChooseRoute />} />
          <Route path="/mealpackage" element={<MealPackage />} />
          <Route path="/cabin" element={<Cabin />} />
          <Route path="/passengerdetails" element={<PassengerDetails />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/choosepayment" element={<Choosepayment />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </InactivityProvider>
    </Router>
  );
};

export default App;
