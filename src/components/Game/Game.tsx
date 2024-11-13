import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  

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
  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    setMessage(null); 
    if (selectedPiece) {
     
      const newBoard = [...board]; 
      newBoard[selectedPosition![0]][selectedPosition![1]] = '';
      newBoard[rowIdx][colIdx] = piece; 

      setBoard(newBoard);

      setSelectedPiece(null);
      setSelectedPosition(null);
    } else {
      setSelectedPiece(piece);
      setSelectedPosition([rowIdx, colIdx]);
    }
    CaseToDeplace(piece,rowIdx,colIdx)
    switch (piece) {
      case '♔':
      case '♚':

        break;
      case '♛':
      case '♕':

        break;
      default:
        console.log("Pièce sélectionnée", piece , "coordonée:" ,"lignes",rowIdx,"colone",colIdx,);
        break;
    }
  };


  type Position = [number, number];
function  CaseToDeplace(piece: string, rowIdx: number, colIdx: number){
    const moves: Position[] = [];

    function generateLineMoves(row: number, col: number, rowDirection: number, colDirection: number): void {
        let r = row + rowDirection;
        let c = col + colDirection;
    
<<<<<<< HEAD
    const onKeyPress= (piece: string) => {
        setMessage(null)
        switch (piece){
            case '♔':
            case '♚':
                
            break;
            case '♛':
            case '♕':
                console.log("Gabinou",false)
            break

=======
        // Continuer tant que nous ne dépassons pas les bords du plateau (0 <= r < 8 et 0 <= c < 8)
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          moves.push([r, c]);
          r += rowDirection;
          c += colDirection;
>>>>>>> 3708e7d440aa97b8daf49d47692365684b598a04
        }
      }


    switch (piece) {
        case '♔':
        case '♚':
            //calcul piece dispo rois
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
              console.log (moves);

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
            console.log (moves);
      
          break;
        case '♙':
        case '♟':
            const direction = (piece === '♙') ? +1 : -1; 
            moves.push([rowIdx + direction, colIdx]);  
            if ((piece === '♙' && rowIdx === 6) || (piece === '♟' && rowIdx === 1)) {
              moves.push([rowIdx + 2 * direction, colIdx]); 
            }    
            //todo premier deplacement 
            console.log (moves);
          break;
          case '♗':
          case '♝':
            //calcul piece dispo fou  
            generateLineMoves(rowIdx, colIdx, -1, -1); 
            generateLineMoves(rowIdx, colIdx, -1, 1); 
            generateLineMoves(rowIdx, colIdx, 1, -1);  
            generateLineMoves(rowIdx, colIdx, 1, 1);  
            console.log (moves);
         
          break;
          case '♖':
          case '♜':
            //calcul piece dispo tour   
            generateLineMoves(rowIdx, colIdx, -1, 0);
            generateLineMoves(rowIdx, colIdx, 1, 0);   
            generateLineMoves(rowIdx, colIdx, 0, -1);  
            generateLineMoves(rowIdx, colIdx, 0, 1);  
            console.log (moves);
        
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
              console.log (moves);
        
        break;
    }





};


  return (
    <div>
      <Title text="Les échecs c'est génial" />
      <ChessBoard board={board} onKeyPress={onKeyPress} />
    </div>
  );
};

export default Game;
