import React from 'react';

interface Props {
  piece: string;
  rowIdx: number;
  colIdx: number;
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void;
}

const ChessBoardKey: React.FC<Props> = ({ piece, rowIdx, colIdx, onKeyPress }) => {
  return (
    <div
      className="h-12 w-12 border-2 border-black rounded-md flex items-center justify-center m-1 hover:cursor-pointer"
      onClick={() => onKeyPress(piece, rowIdx, colIdx)}  // Passer la pièce et ses coordonnées
    >
      {piece}
    </div>
  );
};

export default ChessBoardKey;
