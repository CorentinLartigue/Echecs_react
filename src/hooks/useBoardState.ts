import { useState, useCallback } from "react";

export const useBoardState = (initialBoard: string[][]) => {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [highlightedMoves, setHighlightedMoves] = useState<[number, number][]>([]);

  const resetHighlightedMoves = useCallback(() => setHighlightedMoves([]), []);
  
  const updateBoard = useCallback((from: [number, number], to: [number, number], piece: string) => {
    const newBoard = [...board];
    newBoard[from[0]][from[1]] = "";
    newBoard[to[0]][to[1]] = piece;
    setBoard(newBoard);
  }, [board]);

  return { board, highlightedMoves, setHighlightedMoves, resetHighlightedMoves, updateBoard };
};
