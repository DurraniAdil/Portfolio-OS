
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Player = 'X' | 'O' | null;
type GameMode = 'PvP' | 'PvE';

export const TicTacToeApp: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [mode, setMode] = useState<GameMode>('PvE');
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diags
  ];

  const calculateWinner = (squares: Player[]) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: winningCombinations[i] };
      }
    }
    if (!squares.includes(null)) return { winner: 'Draw' as const, line: [] };
    return null;
  };

  const handleMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      updateScore(result.winner);
    }
  };

  const updateScore = (win: Player | 'Draw') => {
    setScores(prev => ({
      ...prev,
      X: win === 'X' ? prev.X + 1 : prev.X,
      O: win === 'O' ? prev.O + 1 : prev.O,
      Draws: win === 'Draw' ? prev.Draws + 1 : prev.Draws,
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  // Basic AI for PvE
  useEffect(() => {
    if (mode === 'PvE' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptySquares = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null) as number[];
        if (emptySquares.length > 0) {
          // Try to win or block
          let move = -1;

          // Win check
          for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            const values = [board[a], board[b], board[c]];
            if (values.filter(v => v === 'O').length === 2 && values.includes(null)) {
              move = combo[values.indexOf(null)];
              break;
            }
          }

          // Block check
          if (move === -1) {
            for (let combo of winningCombinations) {
              const [a, b, c] = combo;
              const values = [board[a], board[b], board[c]];
              if (values.filter(v => v === 'X').length === 2 && values.includes(null)) {
                move = combo[values.indexOf(null)];
                break;
              }
            }
          }

          // Random move if no win/block
          if (move === -1) {
            move = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          }

          handleMove(move);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, mode, winner]);

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-white font-sans overflow-hidden">
      {/* App Header */}
      <header className="h-14 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎮</span>
          <h1 className="text-xs font-black uppercase tracking-widest text-zinc-400">Tactical Node Resolver</h1>
        </div>
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
          {(['PvE', 'PvP'] as GameMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); resetGame(); }}
              className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-zinc-500 hover:text-white'}`}
            >
              {m === 'PvE' ? 'vs System' : 'Local PvP'}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-zinc-950 to-purple-900/10 pointer-events-none" />

        {/* Score Board */}
        <div className="flex gap-6 mb-6 relative z-10">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Player X</span>
            <span className="text-xl font-black text-blue-400 tabular-nums">{scores.X}</span>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Draws</span>
            <span className="text-xl font-black text-white tabular-nums">{scores.Draws}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">{mode === 'PvE' ? 'System O' : 'Player O'}</span>
            <span className="text-xl font-black text-rose-400 tabular-nums">{scores.O}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl relative z-10 shadow-2xl">
          {board.map((cell, i) => (
            <motion.button
              key={i}
              whileHover={!cell && !winner ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' } : {}}
              whileTap={!cell && !winner ? { scale: 0.95 } : {}}
              onClick={() => handleMove(i)}
              className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-black transition-all border border-transparent ${winningLine.includes(i)
                ? 'bg-white/15 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                : 'bg-white/5'
                } ${!cell && !winner ? 'cursor-pointer hover:border-white/10' : 'cursor-default'}`}
            >
              <AnimatePresence mode="wait">
                {cell === 'X' && (
                  <motion.span
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    ✕
                  </motion.span>
                )}
                {cell === 'O' && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                  >
                    ◯
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Footer Status */}
        <div className="mt-6 flex flex-col items-center relative z-10">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <span className="text-xl font-black uppercase tracking-[0.3em] text-white">
                  {winner === 'Draw' ? 'Neutral Stalemate' : `${winner} Dominance Verified`}
                </span>
                <button
                  onClick={resetGame}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/40"
                >
                  Initiate New Cycle
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={isXNext ? 'X' : 'O'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full animate-pulse ${isXNext ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {isXNext ? "Player X Input Required" : mode === 'PvE' ? "Calculating Optimal Node..." : "Player O Input Required"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* OS Status Strip */}
      <footer className="h-10 bg-black/60 border-t border-white/5 px-8 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-zinc-600">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            Simulation: Stable
          </span>
          <span>|</span>
          <span>AI Level: Standard</span>
        </div>
        <button
          onClick={() => setScores({ X: 0, O: 0, Draws: 0 })}
          className="text-[9px] font-black text-zinc-700 uppercase tracking-widest hover:text-rose-400 transition-colors"
        >
          Reset Statistics
        </button>
      </footer>
    </div>
  );
};
