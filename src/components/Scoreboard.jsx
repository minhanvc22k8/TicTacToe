import React from 'react';

function Scoreboard({ scores, isXNext }) {
  const opponentName = scores.mode === 'pvp' ? 'Player (O)' : 'AI (O)';
  
  return (
    <div className="scoreboard">
      <div id="score-x" className={`score ${isXNext ? 'active' : ''}`}>
        <h3>Player (X)</h3>
        <p>{scores.X}</p>
      </div>
      <div className="score">
        <h3>Hòa</h3>
        <p>{scores.T}</p>
      </div>
      <div id="score-o" className={`score ${!isXNext ? 'active' : ''}`}>
        <h3>{opponentName}</h3>
        <p>{scores.O}</p>
      </div>
    </div>
  );
}

export default Scoreboard;
