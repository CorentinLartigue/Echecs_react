import React from 'react';
import ChessBoardRow from 'src/components/Game/ChessBoard/ChessBoardRow.tsx';


const board =  [['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
['', '', '', '', '', '', '', ''], 
['', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', ''],
['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']];


const ChessBoard: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center my-12">
      {board.map((row) => (
        <ChessBoardRow
          key={row[0]}
          pieces={row}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
