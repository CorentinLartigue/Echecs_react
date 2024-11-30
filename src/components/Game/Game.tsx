import React, { useState } from "react";
import Title from "../Shared/Title";
import ChessBoard from "./ChessBoard/ChessBoard";
import ReturnButton from "../Shared/ReturnButton";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useCheckMate } from "../../hooks/useCheckMate"; 
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
  const { 
    board, 
    highlightedMoves, 
    onKeyPress, 
    currentPlayer 
  } = useGameLogic(initialBoard);

  const [message, setMessage] = useState<string | null>(null); // Déclare l'état du message
  const { isCheck, isCheckMate } = useCheckMate(board, currentPlayer, setMessage);

  return (
    <div>
      <Title text="Partie en Cours" />
      {message && <p>{message}</p>} {/* Affichage du message */}
      {isCheck && <p style={{ color: "red" }}>Le roi est en échec !</p>}
      {isCheckMate && <p style={{ color: "red" }}>Échec et Mat !</p>}
      <p>Joueur actuel : {currentPlayer === "white" ? "Blanc" : "Noir"}</p>
      <ChessBoard 
        board={board} 
        onKeyPress={onKeyPress} 
        highlightedMoves={highlightedMoves} 
      />
      <ReturnButton />
    </div>
  );
};

export default Game;
