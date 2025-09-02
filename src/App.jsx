import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import GameControls from './components/GameControls';
import { calculateWinner, minimax } from './utils/gameLogic';

const aiPlayer = 'O';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp');
  const [scores, setScores] = useState({ X: 0, O: 0, T: 0, mode: 'pvp' });

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);

  const handleRestart = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }, []); 

  const handleModeChange = useCallback((mode) => {
    setGameMode(mode);
    setScores(prev => ({ X: prev.X, O: prev.O, T: prev.T, mode: mode }));
    handleRestart();
  }, [handleRestart]); 

  const handleClick = (i) => {
    if (winnerInfo || squares[i] || (gameMode !== 'pvp' && !isXNext)) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };
  
  // Logic AI
  useEffect(() => {
    if (gameMode !== 'pvp' && !isXNext && !winnerInfo) {
      const makeAiMove = () => {
        const availableSpots = squares.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        if (availableSpots.length === 0) return;

        let aiMove;
        if (gameMode === 'easy') {
          const randomIndex = Math.floor(Math.random() * availableSpots.length);
          aiMove = availableSpots[randomIndex];
        } else {
          const bestMove = minimax([...squares], aiPlayer);
          aiMove = bestMove.index;
        }
        
        if (aiMove !== undefined) {
          const newSquares = [...squares];
          newSquares[aiMove] = aiPlayer;
          setSquares(newSquares);
          setIsXNext(true);
        }
      };
      
      const timer = setTimeout(makeAiMove, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, winnerInfo, squares]);

  // Cập nhật điểm số
  useEffect(() => {
    if (winnerInfo) {
      setScores(prevScores => {
        const newScores = { ...prevScores };
        if (winnerInfo.winner === 'X') newScores.X++;
        else if (winnerInfo.winner === 'O') newScores.O++;
        else if (winnerInfo.winner === 'T') newScores.T++;
        return newScores;
      });
    }
  }, [winnerInfo?.winner]);
  
  // Tự động chơi lại
  useEffect(() => {
    if (winnerInfo) {
      const timer = setTimeout(() => {
        handleRestart();
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [winnerInfo, handleRestart]); // <-- SỬA LỖI: THÊM winnerInfo VÀO ĐÂY
  
  let status;
  if (winnerInfo) {
    status = winnerInfo.winner === 'T' ? 'Kết quả: Hòa!' : `Yeah! ${winnerInfo.winner} thắng!`;
  } else {
    status = `Lượt của: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <Scoreboard scores={scores} isXNext={isXNext} />
      <p className="status">{status}</p>
      <Board
        squares={squares}
        onClick={handleClick}
        winningLine={winnerInfo ? winnerInfo.line : []}
      />
      <GameControls 
        gameMode={gameMode}
        onModeChange={handleModeChange}
        onRestart={handleRestart}
      />
    </div>
  );
}