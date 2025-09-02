import React, { useState, useEffect, useMemo } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import GameControls from './components/GameControls';
import { calculateWinner, minimax } from './utils/gameLogic';

const aiPlayer = 'O';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp', 'easy', 'hard'
  const [scores, setScores] = useState({ X: 0, O: 0, T: 0, mode: 'pvp' });

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setScores(prev => ({ ...prev, mode: mode }));
    handleRestart();
  };

  const handleClick = (i) => {
    if (winnerInfo || squares[i] || (gameMode !== 'pvp' && !isXNext)) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };
  
  // Logic cho lượt đi của AI
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

  // Cập nhật điểm số khi game kết thúc
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
  
  // === TÍNH NĂNG MỚI: TỰ ĐỘNG CHƠI LẠI ===
  useEffect(() => {
    // Nếu có người thắng hoặc hòa, đợi 2 giây rồi tự động reset bàn cờ
    if (winnerInfo) {
      const timer = setTimeout(() => {
        handleRestart();
      }, 2000); // 2000ms = 2 giây

      // Dọn dẹp timer nếu component bị unmount
      return () => clearTimeout(timer);
    }
  }, [winnerInfo]); // Effect này sẽ chạy mỗi khi `winnerInfo` thay đổi

  
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