interface CalendarGridProps {
  year: number;
  month: number;
}

const CalendarGrid = ({ year, month }: CalendarGridProps) => {
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const firstDay = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Starter med mandag
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days = [
    ...Array.from({ length: adjustedFirstDay }, (_, i) => prevMonthDays - adjustedFirstDay + i + 1),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (days.length % 7 !== 0) {
    days.push(days.length - adjustedFirstDay - daysInMonth + 1);
  }

  return (
    <div className="calendar-grid">
      <div className="weekdays">
        {weekdays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${index < adjustedFirstDay || index >= adjustedFirstDay + daysInMonth ? 'disabled' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
