import React from 'react';

function GameControls({ gameMode, onModeChange, onRestart }) {
  return (
    <div>
      <div className="controls">
        <button className="btn btn-restart" onClick={onRestart}>Chơi Lại</button>
      </div>
      <div className="mode-selection">
        <button className={`btn ${gameMode === 'pvp' ? 'btn-primary' : 'btn-default'}`} onClick={() => onModeChange('pvp')}>Player vs Player</button>
        <button className={`btn ${gameMode === 'easy' ? 'btn-primary' : 'btn-default'}`} onClick={() => onModeChange('easy')}>vs AI (Dễ)</button>
        <button className={`btn ${gameMode === 'hard' ? 'btn-primary' : 'btn-default'}`} onClick={() => onModeChange('hard')}>vs AI (Khó)</button>
      </div>
    </div>
  );
}

export default GameControls;