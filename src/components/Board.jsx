import React from 'react';
import Square from './Square';

function Board({ squares, onClick, winningLine }) {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinning={winningLine.includes(i)}
        />
      ))}
    </div>
  );
}

export default Board;