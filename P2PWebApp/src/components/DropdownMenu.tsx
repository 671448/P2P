import { useState, useEffect } from 'react';
import '../css/DropdownMenu.css';
import { Port } from '../Interfaces/IPort';

interface DropdownMenuProps {
  onSelectPort: (portName: string) => void; // Callback-funksjon som tar inn portens navn
  parent: string;
}

export default function DropdownMenu({ onSelectPort, parent }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPort, setSelectedPort] = useState('');
  const [selectMessage] = useState('Select port...');
  const [borderRadius, setBorderRadius] = useState('16px');
  const [ports, setPorts] = useState<Port[]>([]); // Store fetched ports
  const [errorMessage, setErrorMessage] = useState('Loading ports..');
  const [disabledPort, setDisabledPort] = useState<string | null>(null); // Her lagrer vi den deaktiverte havnen

  // Fetch ports from API
  useEffect(() => {
    const storedPorts = sessionStorage.getItem('ports');

    if (storedPorts) {
      setPorts(JSON.parse(storedPorts));
    }
    fetch('http://localhost:5215/api/Ports')
      .then((response) => response.json())
      .then((data: Port[]) => {
        setPorts(data);
        sessionStorage.setItem('storedPorts', JSON.stringify(data));
      })
      .catch((error) => {
        setErrorMessage('Error fetching ports, try again later.');
        console.error('Error fetching ports', error);
      });

    if (parent === 'destination') {
      // Departureport må være valgt
      const storedDeparturePort = sessionStorage.getItem('departurePort');
      if (storedDeparturePort) {
        setDisabledPort(storedDeparturePort); // Sett departurePort som disabled
      }
      // Hvis man tidligere har valgt port.
      const destinationPort = sessionStorage.getItem('destinationPort');
      if (destinationPort) {
        if (destinationPort !== storedDeparturePort) {
          setSelectedPort(destinationPort);
          onSelectPort(destinationPort);
        } else {
          setSelectedPort('');
          sessionStorage.removeItem('destinationPort');
        }
      }
    }
    if (parent === 'departure') {
      const departurePort = sessionStorage.getItem('departurePort');
      if (departurePort) {
        setSelectedPort(departurePort);
        onSelectPort(departurePort);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setBorderRadius(!isOpen ? '16px 16px 0 0' : '16px');
  };

  const handleSelectPort = (portName: string) => {
    setSelectedPort(portName); // Sett den valgte porten
    toggleDropdown();
    onSelectPort(portName); // Kall tilbake funksjonen for å oppdatere valget i Departure page
  };

  return (
    <div className="custom-dropdown">
      <div className="custom-dropdown-toggle" onClick={toggleDropdown} style={{ borderRadius }}>
        <p>
          <strong>{selectedPort === '' ? selectMessage : selectedPort}</strong>
        </p>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="custom-dropdown-menu">
          {ports.length > 0 ? (
            ports.map((port) => (
              <div
                key={port.portID}
                className="custom-dropdown-item"
                onClick={() => handleSelectPort(port.name)}
                style={{
                  pointerEvents: disabledPort && port.name === disabledPort ? 'none' : 'auto', // Deaktiver valgt havn
                  opacity: disabledPort && port.name === disabledPort ? 0.5 : 1, // Grå ut deaktiverte havner
                }}
              >
                {port.name}
              </div>
            ))
          ) : (
            <div className="custom-dropdown-item">{errorMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}
