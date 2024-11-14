import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>([]);

  const generateInitialBoard = (): string[][] => {
    return [
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
    ];
  };

  const [board, setBoard] = useState<string[][]>(generateInitialBoard);

  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    if (selectedPiece) {
 
      const isMoveValid = highlightedMoves.some(
        ([moveRow, moveCol]) => moveRow === rowIdx && moveCol === colIdx
      );
      if (isMoveValid) {
   
        const newBoard = board.map(row => [...row]);
        newBoard[selectedPosition![0]][selectedPosition![1]] = '';
        newBoard[rowIdx][colIdx] = selectedPiece;
        setBoard(newBoard);
        setSelectedPiece(null);
        setSelectedPosition(null);
        setHighlightedMoves([]);
      } else {
        setMessage("Déplacement invalide. Choisissez une case valide.");
      }
    } else {
      setSelectedPiece(piece);
      setSelectedPosition([rowIdx, colIdx]);
      const moves = calculateValidMoves(piece, rowIdx, colIdx);
      setHighlightedMoves(calculateValidMoves(piece, rowIdx, colIdx));
      console.log("Highlighted moves:", moves);
    }
  };

  const calculateValidMoves = (piece: string, rowIdx: number, colIdx: number): [number, number][] => {
    const moves: [number, number][] = [];

    function generateLineMoves(row: number, col: number, rowDirection: number, colDirection: number): void {
      let r = row + rowDirection;
      let c = col + colDirection;
      while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === '') {
        moves.push([r, c]);
        r += rowDirection;
        c += colDirection;
      }
    }
      
        switch (piece) {
          case '♟':
            if (rowIdx > 0 && board[rowIdx - 1][colIdx] === '') {
              moves.push([rowIdx - 1, colIdx]);
      
              
              if (rowIdx === 6 && board[rowIdx - 2][colIdx] === '') {
                moves.push([rowIdx - 2, colIdx]); 
              }
            }
      
            
            if (rowIdx > 0) {
              if (colIdx > 0 && board[rowIdx - 1][colIdx - 1] !== '' && board[rowIdx - 1][colIdx - 1] !== piece) {
                moves.push([rowIdx - 1, colIdx - 1]); 
              }
              if (colIdx < 7 && board[rowIdx - 1][colIdx + 1] !== '' && board[rowIdx - 1][colIdx + 1] !== piece) {
                moves.push([rowIdx - 1, colIdx + 1]); 
              }
            }
          break;
          case '♗':
          case '♝':
            for (let i = 1; i < 8; i++) {
            moves.push([rowIdx - i, colIdx - i]); 
            moves.push([rowIdx - i, colIdx + i]); 
            moves.push([rowIdx + i, colIdx - i]); 
            moves.push([rowIdx + i, colIdx + i]); 
            }
          break;

    }
    return moves;
  };

  return (
    <div>
      <Title text="Les échecs c'est génial" />
      {message && <p>{message}</p>}
      <ChessBoard board={board} onKeyPress={onKeyPress} highlightedMoves={highlightedMoves} />
    </div>
  );
};

export default Game;
