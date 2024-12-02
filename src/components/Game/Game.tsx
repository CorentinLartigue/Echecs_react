import React, { useState } from "react";
import Title from "../Shared/Title";
import ChessBoard from "./ChessBoard/ChessBoard";
import ReturnButton from "../Shared/ReturnButton";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useCheckMate } from "../../hooks/useCheckMate";
import { usePawnPromotion } from "../../hooks/usePawnPromotion";

const initialBoard = [
  ["♜", "♞", "♝", "♚", "♛", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♔", "♕", "♗", "♘", "♖"],
];

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { 
    board, 
    setBoard,
    highlightedMoves, 
    onKeyPress, 
    currentPlayer 
  } = useGameLogic(initialBoard);

  const { isCheck, isCheckMate } = useCheckMate(board, currentPlayer, setMessage);

  const { promotionPiece, setPromotionPiece, setPieceAfterPromotion, promotePawn } = usePawnPromotion(board, 0, 0, currentPlayer, setBoard);

  const handlePawnPromotion = (selectedPosition: [number, number]) => {
    console.log("handlePawnPromotion called with", selectedPosition, promotionPiece); // Vérifier les paramètres
    if (promotionPiece !== null) {
      setPieceAfterPromotion(selectedPosition, promotionPiece);
      setPromotionPiece(null); // Réinitialiser la variable de promotion après l'opération
    }
  };

  return (
    <div>
      <Title text="Partie en Cours" />
      {message && <p>{message}</p>}
      {isCheck && <p style={{ color: "red" }}>Le roi est en échec !</p>}
      {isCheckMate && <p style={{ color: "red" }}>Échec et Mat !</p>}
      <p>Joueur actuel : {currentPlayer === "white" ? "Blanc" : "Noir"}</p>
      <ChessBoard 
        board={board} 
        onKeyPress={onKeyPress} 
        highlightedMoves={highlightedMoves}
        handlePawnPromotion={handlePawnPromotion}
        promotePawn={promotePawn}
      />
      <ReturnButton />
    </div>
  );
};

export default Game;
