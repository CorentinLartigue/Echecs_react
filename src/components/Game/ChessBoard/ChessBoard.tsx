import React from 'react';
import ChessBoardRow from 'src/components/Game/ChessBoard/ChessBoardRow.tsx';

interface Props {
  board: string[][]; 
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void; 
}

const ChessBoard: React.FC<Props> = ({ board, onKeyPress }) => {
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
