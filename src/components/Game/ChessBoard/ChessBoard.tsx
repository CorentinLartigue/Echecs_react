import React from 'react';
import './ChessBoard.css';

type Board = (string | null)[][];

interface ChessBoardProps {
  board: Board;
  currentPlayer: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, currentPlayer }) => {
  return (
    <div>
      <h2>Tour de : {currentPlayer}</h2>
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="chess-row">
            {row.map((cell, cellIndex) => {
              const isWhite = (rowIndex + cellIndex) % 2 === 0;
              return (
                <div
                  key={cellIndex}
                  className={`chess-cell ${isWhite ? 'white' : 'black'}`}
                >
                  {cell || ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
