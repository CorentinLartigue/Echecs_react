import React from 'react';

interface Props {
  piece: string;
  onKeyPress: (piece: string) => void;

}

const ChessBoardKey: React.FC<Props> = ({ piece,onKeyPress}) => {
  return (
    <div 
      key={piece}
      className="h-12 w-12 border-2 border-black rounded-md flex items-center justify-center m-1 hover:cursor-pointer"
      onClick={() => onKeyPress(piece)}

    >
      {piece}
      
    </div>
  );
};

export default ChessBoardKey;
