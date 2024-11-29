import React, { useCallback } from "react";
import Title from "../Shared/Title";
import ChessBoard from "./ChessBoard/ChessBoard";
import ReturnButton from "../Shared/ReturnButton";
import { useBoardState } from "../../hooks/useBoardState";
import { usePlayerLogic } from "../../hooks/usePlayerLogic";
import { useChessUtils } from "../../hooks/useChessUtils";

// Définition des pièces des joueurs
const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

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
  // Hooks pour la gestion de l'état du plateau
  const { 
    board, 
    highlightedMoves, 
    setHighlightedMoves, 
    resetHighlightedMoves, 
    updateBoard 
  } = useBoardState(initialBoard);

  // Hooks pour la logique des joueurs
  const { 
    selectedPiece, 
    selectedPosition, 
    currentPlayer, 
    message, 
    setSelectedPiece, 
    setSelectedPosition, 
    setMessage, 
    togglePlayer, 
    resetSelection 
  } = usePlayerLogic();

  // Utilitaires d'échecs
  const { isAllyPiece, calculateValidMoves } = useChessUtils(board, whitePieces, blackPieces);

  const onKeyPress = useCallback(
    (piece: string, rowIdx: number, colIdx: number) => {
      // Si une pièce est déjà sélectionnée
      if (selectedPiece && selectedPosition) {
        // Si l'utilisateur clique à nouveau sur la pièce sélectionnée, annuler le coup
        if (selectedPosition[0] === rowIdx && selectedPosition[1] === colIdx) {
          resetSelection();  // Annule la sélection de la pièce
          resetHighlightedMoves();  // Réinitialise les cases surlignées
          setMessage("Sélection annulée.");
          return;
        }
  
        // Vérifier si le mouvement est valide
        const isMoveValid = highlightedMoves.some(
          ([moveRow, moveCol]) => moveRow === rowIdx && moveCol === colIdx
        );
  
        // Vérifier si la pièce est ennemie
        const isEnemyPiece = (currentPlayer === "white" && blackPieces.includes(piece)) || 
                              (currentPlayer === "black" && whitePieces.includes(piece));
  
        // Si le mouvement est valide
        if (isMoveValid) {
          // Si la pièce est ennemie, la capturer
          if (isEnemyPiece) {
            updateBoard(selectedPosition, [rowIdx, colIdx], selectedPiece);
            togglePlayer();  // Passer au joueur suivant après la capture
            resetSelection();
            resetHighlightedMoves();
            setMessage(`Pièce ${selectedPiece} capturée à [${rowIdx}, ${colIdx}].`);
          } else {
            // Sinon, simplement déplacer la pièce
            updateBoard(selectedPosition, [rowIdx, colIdx], selectedPiece);
            togglePlayer(); // Passer au joueur suivant après le déplacement
            resetSelection();
            resetHighlightedMoves();
            setMessage(`Pièce déplacée vers [${rowIdx}, ${colIdx}].`);
          }
        } else {
          setMessage("Mouvement invalide.");
        }
        return;
      }
  
      // Si aucune pièce n'est sélectionnée, vérifier si la pièce est valide
      if (piece) {
        // Si c'est une pièce alliée, l'utilisateur peut la sélectionner
        if (!isAllyPiece(piece, rowIdx, colIdx)) {
          setMessage("Ce n'est pas votre pièce.");
          return;
        }
  
        // Vérifier si c'est bien le tour du joueur sélectionné
        if ((currentPlayer === "white" && whitePieces.includes(piece)) || (currentPlayer === "black" && blackPieces.includes(piece))) {
          // Sélectionner la pièce et calculer les mouvements valides
          setSelectedPiece(piece);
          setSelectedPosition([rowIdx, colIdx]);
  
          // Calcul des mouvements valides
          const validMoves = calculateValidMoves(piece, rowIdx, colIdx);
          setHighlightedMoves(validMoves);
  
          setMessage(`Pièce ${piece} sélectionnée.`);
        } else {
          setMessage("Ce n'est pas votre tour.");
        }
      }
    },
    [selectedPiece, selectedPosition, highlightedMoves, currentPlayer, resetSelection, resetHighlightedMoves, setMessage, updateBoard, togglePlayer, isAllyPiece, setSelectedPiece, setSelectedPosition, calculateValidMoves, setHighlightedMoves]
  );

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
