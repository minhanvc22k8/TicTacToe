// --- HÀM KIỂM TRA NGƯỜI THẮNG ---
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dọc
    [0, 4, 8], [2, 4, 6]             // Chéo
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  // Nếu không ai thắng và bàn cờ đã đầy -> Hòa
  if (squares.every(square => square !== null)) {
      return { winner: 'T', line: [] }; // T for Tie
  }
  return null;
}


// --- LOGIC AI MINIMAX (CHẾ ĐỘ KHÓ) ---
const aiPlayer = 'O';
const humanPlayer = 'X';

export function minimax(newSquares, player) {
    const availSpots = newSquares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);

    const winnerInfo = calculateWinner(newSquares);
    if (winnerInfo) {
        if (winnerInfo.winner === aiPlayer) return { score: 10 };
        if (winnerInfo.winner === humanPlayer) return { score: -10 };
        if (winnerInfo.winner === 'T') return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newSquares[availSpots[i]] = player;

        if (player === aiPlayer) {
            let result = minimax(newSquares, humanPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newSquares, aiPlayer);
            move.score = result.score;
        }

        newSquares[availSpots[i]] = null;
        moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}