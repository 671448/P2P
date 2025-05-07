import { useState } from 'react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import DropdownMenu from '../components/DropdownMenu';
import NextButton from '../components/NextButton';
import '../css/Destination.css';
import ProgressBar from '../components/ProgressBar';

export default function Departure() {
  const [isPortSelected, setIsPortSelected] = useState(false);

  // Denne funksjonen oppdaterer isPortSelected basert på valget i DropdownMenu
  const handlePortSelection = (portName: string) => {
    // Sjekker om et gyldig valg er gjort
    setIsPortSelected(portName !== 'Please select a port');
    sessionStorage.setItem('departurePort', portName);
  };
  return (
    <>
      <Navbar />
      <ProgressBar activeStep={0} />
      <BackButton />

      <div className="page">
        <div className="page-title-wrapper">
          <h1 className="page-title">Where are you travelling from?</h1>
        </div>

        <DropdownMenu onSelectPort={handlePortSelection} parent="departure" />
        <NextButton route="/destination" isEnabled={isPortSelected} />
      </div>
    </>
  );
}
