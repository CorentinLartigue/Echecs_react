import React from 'react';

interface Props {
  piece: string; 
  rowIdx: number; 
  colIdx: number; 
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void; 
  isHighlighted: boolean;
}

const ChessBoardKey: React.FC<Props> = ({ piece, rowIdx, colIdx, onKeyPress, isHighlighted }) => {
  return (
    <div
      className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center m-1 hover:cursor-pointer`}
      style={{
        backgroundColor: isHighlighted ? 'green' : (rowIdx + colIdx) % 2 === 0 ? '#f0d9b5' : '#b58863'
      }}
      onClick={() => onKeyPress(piece, rowIdx, colIdx)} 
    >
      {piece}
    </div>
  );
};

export default ChessBoardKey;
