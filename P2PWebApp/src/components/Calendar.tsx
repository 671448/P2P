import { useState } from 'react';
import ReusableDialog from './ReusableDialog';
import YearMonthPicker from './YearMonthPicker';
import CalendarGrid from './CalendarGrid';
import '../css/Calendar.css';
import '../css/ApplyCancelButtons.css';

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialiserer med dagens dato
  const [confirmedDate, setConfirmedDate] = useState(new Date()); // Bekreftet dato
  const [displayMessage, setDisplayMessage] = useState('Choose when you are travelling');

  const handleDateChange = (year: number, month: number) => {
    setSelectedDate(new Date(year, month, 1));
  };

  const applySelection = () => {
    setConfirmedDate(selectedDate); // Setter confirmedDate til selectedDate
    const monthName = selectedDate.toLocaleString('default', { month: 'long' });
    setDisplayMessage(`${monthName}, ${selectedDate.getFullYear()}`); // Display message viser måned og år
    setIsOpen(false);
  };

  return (
    <div className="custom-calendar">
      <div className="custom-calendar-toggle" onClick={() => setIsOpen(true)}>
        <p>{displayMessage}</p>
      </div>
      <ReusableDialog
        className="custom-calendar-open"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="custom-calendar-content">
          <YearMonthPicker
            onChange={(date) => handleDateChange(date.getFullYear(), date.getMonth())}
          />
          <div className="apply-cancel">
            <button className="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="apply" onClick={applySelection}>
              Apply
            </button>
          </div>
        </div>
      </ReusableDialog>
    </div>
  );
}
