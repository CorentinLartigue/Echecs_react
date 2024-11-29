import React from "react";
import Title from "../Shared/Title";
import ChessBoard from "./ChessBoard/ChessBoard";
import ReturnButton from "../Shared/ReturnButton";
import { useGameLogic } from "../../hooks/useGameLogic";

// Initialisation du plateau
const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
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
    message, 
    currentPlayer 
  } = useGameLogic(initialBoard);

  return (
    <div>
      <Title text="Partie en Cours" />
      {message && <p>{message}</p>}
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
