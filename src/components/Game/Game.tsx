import React, { useEffect, useState } from 'react';
import Title from 'src/components/Shared/Title';
import ChessBoard from 'src/components/Game/ChessBoard/ChessBoard';
import Grid from 'src/components/Game/Grid/Grid.tsx';


const Game: React.FC = () => {


  /* Fonction pour générer l'échiquier initial */
  const generateInitialBoard = () => {
    return [
      ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['♜', '♞', '♝', '♔', '♚', '♝', '♞', '♜'],
    ];
  };

  return (
    <div>
      <Title text="Échecs" />
    
    </div>
  );
};

export default Game;



/*Fonction pour choisir sa couleur en donnant son nom Le blanc commence toujours en premier*/

/* Fonction pour basculer le tour
const switchTurn = () => {
  setTurn(turn === 'white' ? 'black' : 'white');
};*/

// Fonction pour gérer le mouvement des pièce


/* Fonction pour générer l'échiquier initial
const generateInitialBoard = (): Board => {
  return [
    ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['♜', '♞', '♝', '♔', '♚', '♝', '♞', '♜'],
  ];
};*/

