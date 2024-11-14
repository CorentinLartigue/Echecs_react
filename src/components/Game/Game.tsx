import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';
import ReturnButton from '../Shared/ReturnButton';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>([]);

  const generateInitialBoard = (): string[][] => {
    return [
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
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

  // Gestion du clic sur la pièce
  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    // Si on clique sur la même pièce, on annule la sélection
    if (selectedPiece && selectedPosition && selectedPiece === piece && selectedPosition[0] === rowIdx && selectedPosition[1] === colIdx) {
      setSelectedPiece(null);
      setSelectedPosition(null);
      setHighlightedMoves([]);
      setMessage("Sélection annulée.");
    } else {
      // Si une pièce est déjà sélectionnée, on tente de déplacer la pièce
      if (selectedPiece) {
        const isMoveValid = highlightedMoves.some(
          ([moveRow, moveCol]) => moveRow === rowIdx && moveCol === colIdx
        );
        if (isMoveValid) {
          const newBoard = board.map(row => [...row]);
          newBoard[selectedPosition![0]][selectedPosition![1]] = '';
          newBoard[rowIdx][colIdx] = selectedPiece;
          setBoard(newBoard);
          setSelectedPiece(null);
          setSelectedPosition(null);
          setHighlightedMoves([]);
        } else {
          setMessage("Déplacement invalide. Choisissez une case valide.");
        }
      } else {
        // Si aucune pièce n'est sélectionnée, on sélectionne la pièce et on affiche ses mouvements possibles
        setSelectedPiece(piece);
        setSelectedPosition([rowIdx, colIdx]);
        const moves = calculateValidMoves(piece, rowIdx, colIdx);
        setHighlightedMoves(moves);
        setMessage(`Pièce ${piece} sélectionnée.`);
      }
    }
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
      case '♟': // pion noir
        if (rowIdx > 0 && board[rowIdx - 1][colIdx] === '') {
          moves.push([rowIdx - 1, colIdx]);

          if (rowIdx === 6 && board[rowIdx - 2][colIdx] === '') {
            moves.push([rowIdx - 2, colIdx]);
          }
        }

        if (rowIdx > 0) {
          if (colIdx > 0 && board[rowIdx - 1][colIdx - 1] !== '' && !blackPieces.includes(board[rowIdx - 1][colIdx - 1])) {
            moves.push([rowIdx - 1, colIdx - 1]);
          }
          if (colIdx < 7 && board[rowIdx - 1][colIdx + 1] !== '' && !blackPieces.includes(board[rowIdx - 1][colIdx + 1])) {
            moves.push([rowIdx - 1, colIdx + 1]);
          }
        }
        break;

      case '♙': // pion blanc
        if (rowIdx < 7 && board[rowIdx + 1][colIdx] === '') {
          moves.push([rowIdx + 1, colIdx]);

          if (rowIdx === 1 && board[rowIdx + 2][colIdx] === '') {
            moves.push([rowIdx + 2, colIdx]);
          }
        }

        if (rowIdx < 7) {
          if (colIdx > 0 && board[rowIdx + 1][colIdx - 1] !== '' && !whitePieces.includes(board[rowIdx + 1][colIdx - 1])) {
            moves.push([rowIdx + 1, colIdx - 1]);
          }
          if (colIdx < 7 && board[rowIdx + 1][colIdx + 1] !== '' && !whitePieces.includes(board[rowIdx + 1][colIdx + 1])) {
            moves.push([rowIdx + 1, colIdx + 1]);
          }
        }
        break;

      case '♗': // fou
      case '♝':
        for (let i = 1; i < 8; i++) {
          generateLineMoves(rowIdx, colIdx, -1, -1); 
          generateLineMoves(rowIdx, colIdx, -1, 1); 
          generateLineMoves(rowIdx, colIdx, 1, -1); 
          generateLineMoves(rowIdx, colIdx, 1, 1); 
        }
        break;
        case '♔':
          case '♚':
                
                moves.push(
                    [rowIdx - 1, colIdx],  
                    [rowIdx + 1, colIdx],  
                    [rowIdx, colIdx - 1],  
                    [rowIdx, colIdx + 1],  
                    [rowIdx - 1, colIdx - 1], 
                    [rowIdx - 1, colIdx + 1],
                    [rowIdx + 1, colIdx - 1], 
                    [rowIdx + 1, colIdx + 1]  
                  );
                  
                  
              break;
              case '♛':
              case '♕':
                    //calcul piece dispo reine   
                    generateLineMoves(rowIdx, colIdx, -1, 0);  
                    generateLineMoves(rowIdx, colIdx, 1, 0);  
                    generateLineMoves(rowIdx, colIdx, 0, -1);  
                    generateLineMoves(rowIdx, colIdx, 0, 1);   
                    generateLineMoves(rowIdx, colIdx, -1, -1); 
                    generateLineMoves(rowIdx, colIdx, -1, 1);  
                    generateLineMoves(rowIdx, colIdx, 1, -1);  
                    generateLineMoves(rowIdx, colIdx, 1, 1);
              break;
              case '♖':
              case '♜':
                  //calcul piece dispo tour   
                  generateLineMoves(rowIdx, colIdx, -1, 0);
                  generateLineMoves(rowIdx, colIdx, 1, 0);   
                  generateLineMoves(rowIdx, colIdx, 0, -1);  
                  generateLineMoves(rowIdx, colIdx, 0, 1);  
                break;
                case '♘':
                case '♞':
                    //calcul piece dispo cavalier  
                    moves.push(
                        [rowIdx - 2, colIdx - 1], [rowIdx - 2, colIdx + 1],
                        [rowIdx + 2, colIdx - 1], [rowIdx + 2, colIdx + 1],
                        [rowIdx - 1, colIdx - 2], [rowIdx - 1, colIdx + 2],
                        [rowIdx + 1, colIdx - 2], [rowIdx + 1, colIdx + 2]
                      );  
                    
                
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
