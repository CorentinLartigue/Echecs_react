import React from 'react';
import ChessBoardKey from 'src/components/Game/ChessBoard/ChessBoardKey.tsx';

interface Props {
    pieces: string[];
}

const ChessBoardRow: React.FC<Props> = ({ pieces }) => {
    console.log("toto",pieces);
  return (
    <div className="flex">
      {
        pieces.map((piece) => (
         <ChessBoardKey
           key={piece}
           piece={piece}
         />
        ))
      }
    </div>
  );
};

export default ChessBoardRow;
