import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    setMessage(null);
    setSelectedPiece(piece);
    setSelectedPosition([rowIdx, colIdx]);
    /*if (selectedPiece) {
      console.log(`Déplacer ${selectedPiece} de (${selectedPosition![0]}, ${selectedPosition![1]}) à (${rowIdx}, ${colIdx})`);
   
      setSelectedPiece(null);
      setSelectedPosition(null);
    } else {
      setSelectedPiece(piece);
      setSelectedPosition([rowIdx, colIdx]);

      console.log(`Pièce sélectionnée: ${piece} à la position (${rowIdx}, ${colIdx})`);
    }*/

    switch (piece) {
      case '♙':
      case '♟':
        console.log("Pièce sélectionnée", piece);
      break;
      case '♛':
      case '♕':
        console.log("Pièce sélectionnée", piece);
      break;
      default:
        console.log("Pièce sélectionnée", piece);
        break;
    }
  };

  return (
    <div>
      <Title text="Les échecs c'est génial" />
      <ChessBoard onKeyPress={onKeyPress} />
    </div>
  );
};

export default Game;
