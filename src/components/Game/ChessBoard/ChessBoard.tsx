import React, { useState } from 'react';
import ChessBoardRow from 'src/components/Game/ChessBoard/ChessBoardRow.tsx';

interface Props {
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void;
}

const ChessBoard: React.FC<Props> = ({ onKeyPress }) => {
  const generateInitialBoard = () => {
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

  return (
    <div className="flex flex-col justify-center items-center my-12">
      {board.map((row, rowIdx) => (
        <ChessBoardRow
          key={rowIdx}
          rowIdx={rowIdx}
          pieces={row}
          onKeyPress={onKeyPress}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
