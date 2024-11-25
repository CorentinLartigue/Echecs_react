import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';
import ReturnButton from '../Shared/ReturnButton';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState("white");

  const generateInitialBoard = (): string[][] => {
    return [
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖']
    ];
  };

  const [board, setBoard] = useState<string[][]>(generateInitialBoard);

  // Liste des pièces blanches et noires
  const whitePieces = ['♙', '♖', '♘', '♗', '♕', '♔'];
  const blackPieces = ['♟', '♜', '♞', '♝', '♛', '♚'];

  const isAllyPiece = (piece: string, targetRow: number, targetCol: number): boolean => {
    if (piece === '') return false;
    
    const targetPiece = board[targetRow][targetCol];
    const isWhitePiece = whitePieces.includes(piece);
    const isBlackPiece = blackPieces.includes(piece);

   
    if (isWhitePiece && whitePieces.includes(targetPiece)) {
      return false;
    }
    if (isBlackPiece && blackPieces.includes(targetPiece)) {
      return false;
    }

    return true; 
  };

  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    // Vérifie si une pièce est déjà sélectionnée (cas où on effectue un mouvement)
    if (selectedPiece && selectedPosition) {
      // Si le joueur clique à nouveau sur la même case, annule la sélection
      if (selectedPosition[0] === rowIdx && selectedPosition[1] === colIdx) {
        setSelectedPiece(null);
        setSelectedPosition(null);
        setHighlightedMoves([]);
        setMessage("Sélection annulée.");
        return;
      }
  
      const isMoveValid = highlightedMoves.some(
        ([moveRow, moveCol]) => moveRow === rowIdx && moveCol === colIdx
      );
  
      if (isMoveValid) {
        // Crée une copie temporaire du plateau pour simuler le mouvement
        const newBoard = board.map(row => [...row]);
        newBoard[selectedPosition[0]][selectedPosition[1]] = '';
        newBoard[rowIdx][colIdx] = selectedPiece;
  
        // Vérifie si le roi du joueur actif est toujours en échec après ce mouvement
        const currentPlayerKing = currentPlayer === "white" ? '♔' : '♚';
  
        if (isKingInCheck(newBoard, currentPlayerKing)) {
          // Si le roi est toujours en échec, vérifie s'il est possible de protéger le roi
          if (!canBlockCheck(newBoard, currentPlayerKing)) {
            setMessage("Ce mouvement ne retire pas l'échec. Choisissez un autre mouvement.");
            return; // Annule le mouvement
          }
        }
  
        // Si le mouvement est valide et enlève l'échec, on met à jour le plateau
        setBoard(newBoard);
        setSelectedPiece(null);
        setSelectedPosition(null);
        setHighlightedMoves([]);
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  
        // Vérifie si le roi adverse est en échec après le déplacement
        const opponentKing = currentPlayerKing === '♔' ? '♚' : '♔';
        if (isKingInCheck(newBoard, opponentKing)) {
          if (isCheckmate(newBoard, opponentKing)) {
            setMessage("Échec et mat !");
          } else {
            setMessage("Échec !");
          }
        } else {
          setMessage(null); // Le roi adverse est hors d'échec
        }
      } else {
        setMessage("Déplacement invalide. Choisissez une case valide.");
      }
      return;
    }
  
    // Vérifie si c'est le tour du joueur actif (blancs ou noirs)
    const isWhitePiece = whitePieces.includes(piece);
    const isBlackPiece = blackPieces.includes(piece);
    if ((currentPlayer === "white" && !isWhitePiece) || (currentPlayer === "black" && !isBlackPiece)) {
      setMessage(`C'est au tour des ${currentPlayer === "white" ? "blancs" : "noirs"}.`);
      return;
    }
  
    // Sélectionne la pièce et affiche les mouvements possibles
    setSelectedPiece(piece);
    setSelectedPosition([rowIdx, colIdx]);
    const moves = calculateValidMoves(piece, rowIdx, colIdx);
    setHighlightedMoves(moves);
    setMessage(`Pièce ${piece} sélectionnée.`);
  };
  
  // Fonction qui vérifie si une pièce peut bloquer l'échec du roi
  const canBlockCheck = (board: string[][], king: string): boolean => {
    let kingPosition: [number, number] | null = null;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === king) {
          kingPosition = [row, col];
          break;
        }
      }
      if (kingPosition) break;
    }
  
    if (!kingPosition) return false;
  
    // Vérifie si une pièce alliée peut bloquer l'attaque
    const alliedPieces = king === '♔' ? whitePieces : blackPieces;
  
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (alliedPieces.includes(piece)) {
          const moves = calculateValidMoves(piece, row, col);
          for (const [moveRow, moveCol] of moves) {
            const tempBoard = board.map(row => [...row]);
            tempBoard[moveRow][moveCol] = piece;
            tempBoard[row][col] = '';
            if (!isKingInCheck(tempBoard, king)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  
  

// Fonction pour vérifier si une pièce est en échec et mat
const isCheckmate = (board: string[][], king: string): boolean => {
  let kingPosition: [number, number] | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        kingPosition = [row, col];
        break;
      }
    }
    if (kingPosition) break;
  }

  if (!kingPosition) return false;

  const alliedPieces = king === '♔' ? whitePieces : blackPieces;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (alliedPieces.includes(piece)) {
        const moves = calculateValidMoves(piece, row, col);
        for (const [moveRow, moveCol] of moves) {
          const tempBoard = board.map(row => [...row]);
          tempBoard[moveRow][moveCol] = piece;
          tempBoard[row][col] = '';
          if (!isKingInCheck(tempBoard, king)) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

// Fonction pour vérifier si le roi est en échec
const isKingInCheck = (board: string[][], king: string): boolean => {
  const enemyPieces = king === '♔' ? blackPieces : whitePieces;
  let kingPosition: [number, number] | null = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        kingPosition = [row, col];
        break;
      }
    }
    if (kingPosition) break;
  }

  if (!kingPosition) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (enemyPieces.includes(piece)) {
        const moves = calculateValidMoves(piece, row, col);
        if (moves.some(([moveRow, moveCol]) => moveRow === kingPosition![0] && moveCol === kingPosition![1])) {
          return true;
        }
      }
    }
  }
  return false;
};

const calculateValidMoves = (piece: string, rowIdx: number, colIdx: number): [number, number][] => {
  const moves: [number, number][] = [];

  function generateLineMoves(row: number, col: number, rowDirection: number, colDirection: number): void {
    let r = row + rowDirection;
    let c = col + colDirection;
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === '') {
      moves.push([r, c]);
      r += rowDirection;
      c += colDirection;
    }
    // Vérifier si la case est occupée par un allié
    if (r >= 0 && r < 8 && c >= 0 && c < 8 && isAllyPiece(piece, r, c)) {
      moves.push([r, c]);
    }
  }

  switch (piece) {
    case '♟': // Pion blanc
      if (rowIdx < 7 && board[rowIdx + 1][colIdx] === '') {
        moves.push([rowIdx + 1, colIdx]);

        if (rowIdx === 1 && board[rowIdx + 2][colIdx] === '') {
          moves.push([rowIdx + 2, colIdx]);
        }
      }

      if (rowIdx < 7) {
        if (colIdx > 0 && board[rowIdx + 1][colIdx - 1] !== '' && !blackPieces.includes(board[rowIdx + 1][colIdx - 1])) {
          moves.push([rowIdx + 1, colIdx - 1]);
        }
        if (colIdx < 7 && board[rowIdx + 1][colIdx + 1] !== '' && !blackPieces.includes(board[rowIdx + 1][colIdx + 1])) {
          moves.push([rowIdx + 1, colIdx + 1]);
        }
      }
      break;

    case '♙': // Pion noir
      if (rowIdx > 0 && board[rowIdx - 1][colIdx] === '') {
        moves.push([rowIdx - 1, colIdx]);

        if (rowIdx === 6 && board[rowIdx - 2][colIdx] === '') {
          moves.push([rowIdx - 2, colIdx]);
        }
      }

      if (rowIdx > 0) {
        if (colIdx > 0 && board[rowIdx - 1][colIdx - 1] !== '' && !whitePieces.includes(board[rowIdx - 1][colIdx - 1])) {
          moves.push([rowIdx - 1, colIdx - 1]);
        }
        if (colIdx < 7 && board[rowIdx - 1][colIdx + 1] !== '' && !whitePieces.includes(board[rowIdx - 1][colIdx + 1])) {
          moves.push([rowIdx - 1, colIdx + 1]);
        }
      }
      break;

      case '♖':
      case '♜':
            generateLineMoves(rowIdx, colIdx, -1, 0);
            generateLineMoves(rowIdx, colIdx, 1, 0);   
            generateLineMoves(rowIdx, colIdx, 0, -1);  
            generateLineMoves(rowIdx, colIdx, 0, 1);  
          break;
    
    case '♗':
    case '♝':
      for (let i = 1; i < 8; i++) {
        generateLineMoves(rowIdx, colIdx, -1, -1); 
        generateLineMoves(rowIdx, colIdx, -1, 1); 
        generateLineMoves(rowIdx, colIdx, 1, -1); 
        generateLineMoves(rowIdx, colIdx, 1, 1); 
      }
      break;
    case '♛':  
    case '♕': 
      // Mouvements ligne droite ou diagonale
      generateLineMoves(rowIdx, colIdx, 1, 0); // Haut
      generateLineMoves(rowIdx, colIdx, -1, 0); // Bas
      generateLineMoves(rowIdx, colIdx, 0, 1); // Droite
      generateLineMoves(rowIdx, colIdx, 0, -1); // Gauche
      generateLineMoves(rowIdx, colIdx, 1, 1); // Diagonale haut droite
      generateLineMoves(rowIdx, colIdx, 1, -1); // Diagonale bas gauche
      generateLineMoves(rowIdx, colIdx, -1, 1); // Diagonale haut gauche
      generateLineMoves(rowIdx, colIdx, -1, -1); // Diagonale bas droite
      break;
    case '♞' :  
    case '♘': // Cavalier
      const knightMoves = [
        [rowIdx + 2, colIdx + 1], [rowIdx + 2, colIdx - 1], [rowIdx - 2, colIdx + 1], [rowIdx - 2, colIdx - 1],
        [rowIdx + 1, colIdx + 2], [rowIdx + 1, colIdx - 2], [rowIdx - 1, colIdx + 2], [rowIdx - 1, colIdx - 2]
      ];

      knightMoves.forEach(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          // Vérifie si la case est occupée par un allié
          if (board[r][c] === '' || isAllyPiece(piece, r, c)) {
            moves.push([r, c]);
          }
        }
      });
      break;
    case '♚':
    case '♔': // Roi
      const kingMoves = [
        [rowIdx + 1, colIdx], [rowIdx - 1, colIdx], [rowIdx, colIdx + 1], [rowIdx, colIdx - 1],
        [rowIdx + 1, colIdx + 1], [rowIdx - 1, colIdx - 1], [rowIdx + 1, colIdx - 1], [rowIdx - 1, colIdx + 1]
      ];

      kingMoves.forEach(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          // Vérifie si la case est occupée par un allié
          if (board[r][c] === '' || isAllyPiece(piece, r, c)) {
            moves.push([r, c]);
          }
        }
      });
      break;

    default:
      break;
  }

  return moves;
};

  return (
    <div>
      <Title text="Partie en Cours" />
      {message && <p>{message}</p>} 
      <ChessBoard board={board} onKeyPress={onKeyPress} highlightedMoves={highlightedMoves} />
      <ReturnButton />
    </div>
  );
};

export default Game;
