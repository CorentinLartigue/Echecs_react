*import React from 'react';
import ChessBoardKey from 'src/components/Game/ChessBoard/ChessBoardKey.tsx';

interface Props {
  rowIdx: number; 
  pieces: string[]; 
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void; 
}

const ChessBoardRow: React.FC<Props> = ({ rowIdx, pieces, onKeyPress }) => {
  return (
    <div className="flex">
      {pieces.map((piece, colIdx) => (
        <ChessBoardKey
          key={colIdx}  
          piece={piece}
          rowIdx={rowIdx}
          colIdx={colIdx}
          onKeyPress={onKeyPress}
        />
      ))}
    </div>
  );
};

export default ChessBoardRow;
