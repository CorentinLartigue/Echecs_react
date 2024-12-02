import { useCallback } from "react";
import { useBoardState } from "../hooks/useBoardState";
import { usePlayerLogic } from "../hooks/usePlayerLogic";
import { useChessUtils } from "../hooks/useChessUtils";

// Définition des pièces des joueurs
const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

export const useGameLogic = (initialBoard: string[][]) => {
  const { 
    board,
    setBoard, 
    highlightedMoves, 
    setHighlightedMoves, 
    resetHighlightedMoves, 
    updateBoard 
  } = useBoardState(initialBoard);

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

  const { isAllyPiece, calculateValidMoves } = useChessUtils(board, whitePieces, blackPieces);

  const onKeyPress = useCallback(
    (piece: string, rowIdx: number, colIdx: number) => {
      // Si une pièce est déjà sélectionnée
      if (selectedPiece && selectedPosition) {
        // Si l'utilisateur clique à nouveau sur la pièce sélectionnée, annuler le coup
        if (selectedPosition[0] === rowIdx && selectedPosition[1] === colIdx) {
          resetSelection();  
          resetHighlightedMoves();  
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
            togglePlayer();  
            resetSelection();
            resetHighlightedMoves();
            setMessage(`Pièce ${selectedPiece} capturée à [${rowIdx}, ${colIdx}].`);
          } else {
            // Sinon, simplement déplacer la pièce
            updateBoard(selectedPosition, [rowIdx, colIdx], selectedPiece);
            togglePlayer(); 
            resetSelection();
            resetHighlightedMoves();
            setMessage(`Pièce déplacée vers [${rowIdx}, ${colIdx}].`);
          }
        } else {
          setMessage("Mouvement invalide.");
        }
        return;
      }

      if (piece) {
        if (!isAllyPiece(piece, rowIdx, colIdx)) {
          setMessage("Ce n'est pas votre pièce.");
          return;
        }

        // Vérifier si c'est bien le tour du joueur sélectionné
        if ((currentPlayer === "white" && whitePieces.includes(piece)) || (currentPlayer === "black" && blackPieces.includes(piece))) {
          setSelectedPiece(piece);
          setSelectedPosition([rowIdx, colIdx]);

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

  return {
    board,
    setBoard,
    highlightedMoves,
    onKeyPress,
    message,
    currentPlayer
  };
};
