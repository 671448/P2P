import { useState } from 'react';
import '../css/YearMonthPicker.css';

const YearMonthPicker = ({ onChange }: { onChange: (date: Date) => void }) => {
  const [selectedYearMonth, setSelectedYearMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Setter til første dag i gjeldende måned
  );

  const handleYearChange = (offset: number) => {
    setSelectedYearMonth((prev) => {
      const newDate = new Date(prev.getFullYear() + offset, prev.getMonth(), 1);
      onChange(newDate); // Sender oppdatert dato til parent
      return newDate;
    });
  };

  const handleMonthChange = (month: number) => {
    setSelectedYearMonth((prev) => {
      const newDate = new Date(prev.getFullYear(), month - 1, 1);
      onChange(newDate); // Sender oppdatert dato til parent
      return newDate;
    });
  };

  return (
    <div className="year-month-content">
      {/* Årsvelger med piler */}
      <div className="calendar-year">
        <button onClick={() => handleYearChange(-1)}>&lt;</button>
        <span>{selectedYearMonth.getFullYear()}</span>
        <button onClick={() => handleYearChange(1)}>&gt;</button>
      </div>

      {/* Månedsliste */}
      <div className="calendar-month">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
          (month, index) => (
            <div
              key={index}
              className={`month ${selectedYearMonth.getMonth() === index ? 'selected' : ''}`}
              onClick={() => handleMonthChange(index + 1)}
            >
              {month}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default YearMonthPicker;
