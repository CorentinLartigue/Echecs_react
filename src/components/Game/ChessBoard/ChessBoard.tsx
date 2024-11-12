import React, { useEffect, useState } from 'react';
import ChessBoardRow from 'src/components/Game/ChessBoard/ChessBoardRow.tsx';


interface Props {
  onKeyPress: (piece: string) => void;
}

const ChessBoard: React.FC<Props> = ({ onKeyPress }) => {
  
  const generateInitialBoard = () => {
    return [['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']];

  }

  const [board, setBoard] = useState<string[][]>(generateInitialBoard);


  return (
    <div className="flex flex-col justify-center items-center my-12">
      {board.map((row) => (
        <ChessBoardRow
          key={row[0]}
          pieces={row}
          onKeyPress={onKeyPress}

        />
      ))}
    </div>
  );
};

export default ChessBoard;
