import { useState, useEffect } from "react";
import { useChessUtils } from "../hooks/useChessUtils";

const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

export const useCheckMate = (board: string[][], currentPlayer: string, setMessage: (msg: string) => void) => {
  const { calculateValidMoves } = useChessUtils(board, whitePieces, blackPieces);

  const [isCheck, setIsCheck] = useState(false);
  const [isCheckMate, setIsCheckMate] = useState(false);

  // Fonction pour trouver la position du roi
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

  // Vérifier si une case est sous attaque par une pièce ennemie
  const isSquareUnderAttack = (row: number, col: number, player: string) => {
    const enemyPieces = player === "white" ? blackPieces : whitePieces;
    
    // Vérifie si une pièce ennemie peut attaquer cette case
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        const piece = board[r][c];
        if (enemyPieces.includes(piece)) {
          const validMoves = calculateValidMoves(piece, r, c);
          if (validMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col)) {
            return true; // Si une pièce ennemie peut attaquer la case
          }
        }
      }
    }
    return false;
  };

  const checkKingInCheck = (kingPosition: [number, number] | null) => {
    if (!kingPosition) return false;
  
    const [kingRow, kingCol] = kingPosition;
  
    // Vérifier si la position du roi est sous attaque
    return isSquareUnderAttack(kingRow, kingCol, currentPlayer);
  };
  

  // Vérifier si le roi est en échec et mat
  const checkCheckMate = (kingPosition: [number, number] | null) => {
    if (!kingPosition) return false;
  
    const [kingRow, kingCol] = kingPosition;
  
    // Vérifier si le roi peut se déplacer sur une case sûre
    const possibleMoves = [
      [kingRow - 1, kingCol], // Haut
      [kingRow + 1, kingCol], // Bas
      [kingRow, kingCol - 1], // Gauche
      [kingRow, kingCol + 1], // Droite
      [kingRow - 1, kingCol - 1], // Haut-Gauche
      [kingRow - 1, kingCol + 1], // Haut-Droite
      [kingRow + 1, kingCol - 1], // Bas-Gauche
      [kingRow + 1, kingCol + 1], // Bas-Droite
    ];
  
    // Si aucune case n'est sûre, alors le roi est en échec et mat
    return !possibleMoves.some(([row, col]) => {
      if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        // Si la case est sûre, le roi n'est pas en échec
        return !isSquareUnderAttack(row, col, currentPlayer);
      }
      return false;
    });
  };

  const isKingMoveValid = (startRow: number, startCol: number, endRow: number, endCol: number): boolean => {
    const kingPosition = findKingPosition(currentPlayer);
    if (!kingPosition) {
        setMessage("Position du roi non trouvée.");
        return false;
    }

    // 1. Vérification que la case de destination est adjacente au roi (1 case à chaque direction)
    const isAdjacent = Math.abs(endRow - startRow) <= 1 && Math.abs(endCol - startCol) <= 1;
    if (!isAdjacent) {
        setMessage("Le roi ne peut se déplacer que d'une case à la fois.");
        return false;
    }

    // 2. Vérification si la case de destination est sous attaque
    if (isSquareUnderAttack(endRow, endCol, currentPlayer)) {
        setMessage("Le roi ne peut pas se déplacer sur une case menacée.");
        return false;
    }

    // 3. Simulation du mouvement
    const newBoard = [...board].map(row => [...row]);  // Créer une copie du plateau
    newBoard[endRow][endCol] = newBoard[startRow][startCol];  // Déplacer le roi
    newBoard[startRow][startCol] = "";  // La case de départ devient vide

    // 4. Vérification si le roi est toujours en échec après le mouvement
    const newKingPosition = findKingPosition(currentPlayer);
    if (newKingPosition && checkKingInCheck(newKingPosition)) {
        setMessage("Ce mouvement laisserait le roi en échec.");
        return false;
    }

    // 5. Le mouvement est valide
    return true;
};

  // Vérifier si le roi est en échec
  const checkAllMoves = () => {
    const kingPosition = findKingPosition(currentPlayer);

    // Vérifier si le roi est en échec
    const checkResult = checkKingInCheck(kingPosition);
    setIsCheck(checkResult);

    // Vérifier si le roi est en échec et mat
    const checkMateResult = checkCheckMate(kingPosition);
    setIsCheckMate(checkMateResult);

    if (checkResult) {
      setMessage("Le roi est en échec !");
    } else if (checkMateResult) {
      setMessage("Échec et Mat !");
    } else {
      setMessage("Aucun échec !"); // Aucun échec ou échec et mat
    }
  };

  // Vérification à chaque fois que l'état du plateau ou du joueur change
  useEffect(() => {
    checkAllMoves();
  }, [board, currentPlayer]);

  return { isCheck, isCheckMate, isKingMoveValid };
};
