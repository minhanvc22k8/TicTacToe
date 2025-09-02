import React from 'react';

// === ICON "X" CUTE ===
const IconX = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L60 60" stroke="#FF7043" strokeWidth="14" strokeLinecap="round"/>
    <path d="M60 20L20 60" stroke="#FF7043" strokeWidth="14" strokeLinecap="round"/>
  </svg>
);

// === ICON "O" CUTE ===
const IconO = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="23" stroke="#26A69A" strokeWidth="14"/>
  </svg>
);

function Square({ value, onClick, isWinning }) {
  // Thêm class 'filled' khi có giá trị để kích hoạt animation
  const isFilled = value ? 'filled' : '';
  const className = `square ${isFilled} ${isWinning ? 'winning-square' : ''}`;
  
  return (
    <div className={className} onClick={onClick}>
      <div className="symbol">
        {value === 'X' && <IconX />}
        {value === 'O' && <IconO />}
      </div>
    </div>
  );
}

export default Square;
