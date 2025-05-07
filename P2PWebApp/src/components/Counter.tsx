import { useState, useEffect } from 'react';
import { CounterProps } from '../Interfaces/CounterProps';
import '../css/Counter.css';

const Counter = ({ label, initialCount, onCountChange }: CounterProps) => {
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const updatedCount = count + 1; // Calculate the updated count
    setCount(updatedCount); // Update state
    onCountChange(label, updatedCount); // Pass updated count to parent
  };

  // Function to handle decrement
  const handleDecrement = () => {
    const updatedCount = Math.max(0, count - 1); // Calculate the updated count
    setCount(updatedCount); // Update state
    onCountChange(label, updatedCount); // Pass updated count to parent
  };

  return (
    <div className="counter">
      <span className="counter__label">{label}</span>
      <div className="counter__controls">
        <button className="counter__btn" onClick={handleDecrement}>
          −
        </button>
        <span className="count">{count}</span>
        <button className="counter__btn" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
