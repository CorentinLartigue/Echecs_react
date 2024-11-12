import React, { useState } from 'react';
import Title from '../Shared/Title';
import ChessBoard from './ChessBoard/ChessBoard';

const Game: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const onKeyPress = (piece: string, rowIdx: number, colIdx: number) => {
    setMessage(null);

    // Si une pièce est déjà sélectionnée, essayer de déplacer la pièce
    if (selectedPiece) {
      console.log(`Déplacer ${selectedPiece} de (${selectedPosition![0]}, ${selectedPosition![1]}) à (${rowIdx}, ${colIdx})`);
      // Ajouter ici la logique pour déplacer la pièce sur le plateau
      // Par exemple, mettre à jour l'échiquier avec la nouvelle position

      // Réinitialiser la sélection
      setSelectedPiece(null);
      setSelectedPosition(null);
    } else {
      // Si aucune pièce n'est sélectionnée, on la sélectionne
      setSelectedPiece(piece);
      setSelectedPosition([rowIdx, colIdx]);

      // Afficher un message de sélection (facultatif)
      console.log(`Pièce sélectionnée: ${piece} à la position (${rowIdx}, ${colIdx})`);
    }

    switch (piece) {
      case '♔':
      case '♚':
        console.log("tanus", true);
        break;
      case '♛':
      case '♕':
        console.log("Gabinou", false);
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
