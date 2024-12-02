import React, { useEffect } from 'react';
import ChessBoardKey from './ChessBoardKey';

interface Props {
  board: string[][];
  onKeyPress: (piece: string, rowIdx: number, colIdx: number) => void;
  highlightedMoves: [number, number][];
  handlePawnPromotion?: (selectedPosition: [number, number]) => void;
  promotePawn : () => void;
}

const ChessBoard: React.FC<Props> = ({ board, onKeyPress, highlightedMoves, promotePawn }) => {
  useEffect(() => {
    board.forEach((row, rowIdx) => {
      row.forEach((piece) => {
        if ((piece === "♙" && rowIdx === 0) || (piece === "♟" && rowIdx === 7)) {
          console.log("Promotion de pion détectée");
          promotePawn();
        }
      });
    });
  }, [board, promotePawn]);

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
