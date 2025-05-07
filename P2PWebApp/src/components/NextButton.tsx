import { useNavigate } from 'react-router-dom';
import '../css/NextButton.css';
import { NextButtonProps } from '../Interfaces/INextButtonProps';

export default function NextButton({ route, isEnabled }: NextButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isEnabled) {
      navigate(route); // Navigerer til den spesifiserte ruten
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`next-button ${isEnabled ? 'active' : 'disabled'}`}
      disabled={!isEnabled}
    >
      Next
    </button>
  );
}
