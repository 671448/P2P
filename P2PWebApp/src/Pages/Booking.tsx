import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const navigate = useNavigate(); 

  const handlePortSelect = (port:string) => {
    navigate('/destport'); 
  };

  return (
    <div className="page-container">
      <div className="card common-card">
        <h3 className="text-center">Select your departing port</h3>
        <div className="text-center">
          <div className="btn-group">
            <button
              type="button"
              className="custom-btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ports
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => handlePortSelect('Bergen')}>Bergen</a></li>
              <li><a className="dropdown-item" onClick={() => handlePortSelect('Torvik')}>Torvik</a></li>
              <li><a className="dropdown-item" onClick={() => handlePortSelect('Vik')}>Vik</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
