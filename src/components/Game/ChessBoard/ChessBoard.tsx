import React from 'react';
import ChessBoardKey from './ChessBoardKey';

interface Props {
  board: string[][];
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void;
  highlightedMoves: [number, number][];
}

const ChessBoard: React.FC<Props> = ({ board, onKeyPress, highlightedMoves }) => {
  return (
    <div className="flex flex-col justify-center items-center my-12 transform: rotate(180deg)" >
      {board.map((row, rowIdx) => (
        <div className="flex" key={rowIdx}>
          {row.map((piece, colIdx) => {
            const isHighlighted = highlightedMoves.some(([r, c]) => r === rowIdx && c === colIdx);
            return (
              <ChessBoardKey
                key={`${rowIdx}-${colIdx}`}
                piece={piece}
                rowIdx={rowIdx}
                colIdx={colIdx}
                onKeyPress={onKeyPress}
                isHighlighted={isHighlighted}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
