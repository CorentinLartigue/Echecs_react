import React from 'react';
import ChessBoardKey from 'src/components/Game/ChessBoard/ChessBoardKey.tsx';

interface Props {
    pieces: string[];
    onKeyPress: (piece: string) => void;

}

const ChessBoardRow: React.FC<Props> = ({ pieces,onKeyPress }) => {
  return (
    <div className="flex">
      {
        pieces.map((piece) => (
         <ChessBoardKey
           key={piece}
           piece={piece}
           onKeyPress={onKeyPress}

         />
        ))
      }
    </div>
  );
};

export default ChessBoardRow;
