import { useState, useCallback } from "react";
import { useBoardState } from "../hooks/useBoardState";
import { usePlayerLogic } from "../hooks/usePlayerLogic";
import { useChessUtils } from "../hooks/useChessUtils";
import { useGameLogic } from "./useGameLogic"; // Importer useGameLogic

const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];


    
export const useRockHook = (board: string[][]) => {
  const { setHighlightedMoves } = useBoardState(board);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">("white");

  // Utilisation de useGameLogic pour récupérer setHighlightedMoves

  const findKingPosition = (player: string): [number, number] | null => {
    const kingSymbol = player === "white" ? "♔" : "♚";
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === kingSymbol) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const findTowerPosition = (player: string): [number, number] | null => {
    const TowerSymbol = player === "white" ? "♖" : "♜";
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === TowerSymbol) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const IsUnMoveKingNTower = (kingPosition: [number, number], towerPosition: [number, number]) => {
    const { currentPlayer } = usePlayerLogic(); // Utilisation du hook pour obtenir le joueur actuel

    // Vérification si le roi et la tour n'ont pas bougé en fonction de la couleur du joueur
    if (currentPlayer === "white") {
      // Vérification du roi blanc et de la tour blanche
      const isKingInStartingPosition = kingPosition[0] === 7 && kingPosition[1] === 4; // Roi blanc en [7][4]
      const isTowerInStartingPosition = (towerPosition[0] === 7 && (towerPosition[1] === 0 || towerPosition[1] === 7)); // Tour blanche en [7][0] ou [7][7]

      return isKingInStartingPosition && isTowerInStartingPosition;
    } else {
      // Vérification du roi noir et de la tour noire
      const isKingInStartingPosition = kingPosition[0] === 0 && kingPosition[1] === 4; // Roi noir en [0][4]
      const isTowerInStartingPosition = (towerPosition[0] === 0 && (towerPosition[1] === 0 || towerPosition[1] === 7)); // Tour noire en [0][0] ou [0][7]

      return isKingInStartingPosition && isTowerInStartingPosition;
    }
  };

  const CanRockGOorNot = (x: number, y: number): boolean => {
    // Vérifie si une pièce est présente sur la case
    return board[x][y] !== null;
  };

  const checkKingAndRookAlignment = useCallback((selectedPiece : string) => {
    
    console.log(selectedPiece);
    if (!selectedPiece) {
      console.log("Aucune pièce sélectionnée.",selectedPiece);
      return false;
    }
    
    // Vérifier que la pièce sélectionnée est un roi
    const isKing = selectedPiece === "♔" || selectedPiece === "♚";;
    if (!isKing) {
      return false;
    }

    // Récupérer les positions du roi
    const kingPos = selectedPosition;
    console.log(selectedPosition)
    
    // if (!kingPos) return false;

    // Définir les positions de tour en fonction de la couleur du joueur
    const isWhiteKing = currentPlayer === "white";
    const rookPositions = isWhiteKing
    ? [[7, 0], [7, 7]]  // Tours blanches
    : [[0, 0], [0, 7]]; // Tours noires
    console.log(isWhiteKing,rookPositions)

    // Vérifier si la pièce sélectionnée est bien un roi et si elle est alignée avec une tour
    const rookPos = rookPositions.find(([rookRow, rookCol]) => {
      // Vérifier que le roi et la tour sont sur la même ligne (même x)

      return kingPos[0] === rookRow;
    });

    if (!rookPos) {
      console.log("Il n'y a pas de tour alignée avec le roi.");
      return false;
    }

    // Vérifier qu'il n'y a pas de pièces entre le roi et la tour
    const [rookRow, rookCol] = rookPos;
    if (kingPos[1] < rookCol) {
      // Vérification des cases entre le roi et la tour (gauche à droite)
      for (let col = kingPos[1] + 1; col < rookCol; col++) {
        if (board[kingPos[0]][col]) {
          console.log("Il y a des pièces entre le roi et la tour.");
          return false;
        }
      }
    } else if (kingPos[1] > rookCol) {
      // Vérification des cases entre le roi et la tour (droite à gauche)
      for (let col = kingPos[1] - 1; col > rookCol; col--) {
        if (board[kingPos[0]][col]) {
          console.log("Il y a des pièces entre le roi et la tour.");
          return false;
        }
      }
    }

    // Si toutes les vérifications sont passées, surligner les tours
    console.log("Roi et tour alignés, aucun obstacle entre eux.");

    // Mettre à jour les cases des tours dans highlightedMoves
    setHighlightedMoves([
      [rookRow, rookCol], // Ajouter la tour à la liste des cases valides
    ]);

    return true;
  }, [selectedPiece, selectedPosition, currentPlayer, board, setHighlightedMoves]);

  return {
    checkKingAndRookAlignment,
    // Vous pouvez retourner d'autres méthodes ou données ici selon vos besoins.
  };
    };
