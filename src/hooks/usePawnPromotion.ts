import { useEffect, useState } from "react";

export const usePawnPromotion = (
  board: string[][],
  rowIdx: number,
  colIdx: number,
  currentPlayer: string,
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const [promotionPiece, setPromotionPiece] = useState<string | null>(null);

  const promotePawn = () => {
    if (currentPlayer === "white" && rowIdx === 0 && board[rowIdx][colIdx] === "♙") {
      setPromotionPiece("♕"); 
    } else if (currentPlayer === "black" && rowIdx === 7 && board[rowIdx][colIdx] === "♟") {
      setPromotionPiece("♛");
    }
  };

  useEffect(() => {
    if (promotionPiece !== null) {
      console.log("promotionPiece mise à jour :", promotionPiece);
    }
  }, [promotionPiece]);

  const setPieceAfterPromotion = (selectedPosition: [number, number], piece: string) => {
    const newBoard = [...board];
    const [newRowIdx, newColIdx] = selectedPosition;

    newBoard[newRowIdx][newColIdx] = piece;
    setBoard(newBoard);
  };

  return { promotePawn, setPieceAfterPromotion, promotionPiece, setPromotionPiece };
};
