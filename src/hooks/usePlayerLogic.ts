import { useState, useCallback } from "react";

export const usePlayerLogic = () => {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">("white");
  const [message, setMessage] = useState<string | null>(null);

  const togglePlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === "white" ? "black" : "white"));
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedPiece(null);
    setSelectedPosition(null);
    setMessage(null);
  }, []);

  return {
    selectedPiece,
    selectedPosition,
    currentPlayer,
    message,
    setSelectedPiece,
    setSelectedPosition,
    setMessage,
    togglePlayer,
    resetSelection,
  };
};
