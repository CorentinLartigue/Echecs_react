
export const useChessUtils = (
    
    board: string[][],
    whitePieces: string[],
    blackPieces: string[]
) => {
    // Vérifie si la pièce cible est une pièce alliée.
    const isAllyPiece = (piece: string, targetRow: number, targetCol: number): boolean => {
        
        const targetPiece = board[targetRow][targetCol];
        if (!targetPiece) return false;

        if (whitePieces.includes(piece) && whitePieces.includes(targetPiece)) return true;
        if (blackPieces.includes(piece) && blackPieces.includes(targetPiece)) return true;

        if (targetPiece === "♚" || targetPiece === "♔") return true;
        return false; 
    };

    // Calcule les mouvements valides d'une pièce
    const calculateValidMoves = (piece: string, rowIdx: number, colIdx: number): [number, number][] => {
        const validMoves: [number, number][] = [];

        // Mouvement du Pion (♙ / ♟)
        if (piece === "♙" || piece === "♟") {
            const direction = piece === "♙" ? -1 : 1; 
            
            if (board[rowIdx + direction]?.[colIdx] === "") {
                validMoves.push([rowIdx + direction, colIdx]);
            }
            
            if ((piece === "♙" && rowIdx === 6) || (piece === "♟" && rowIdx === 1)) {
                if (board[rowIdx + direction * 2]?.[colIdx] === "") {
                    validMoves.push([rowIdx + direction * 2, colIdx]);
                }
            }
            
            // Capturer en diagonale
            const captureDirections = [-1, 1]; 
            captureDirections.forEach((dir) => {
                const targetRow = rowIdx + direction;
                const targetCol = colIdx + dir;
                if (board[targetRow]?.[targetCol] && !isAllyPiece(piece, targetRow, targetCol)) {
                    validMoves.push([targetRow, targetCol]);
                }
            });
        }

        if (piece === "♖" || piece === "♜") {
            const directions: [number, number][] = [
                [-1, 0], 
                [1, 0],  
                [0, -1], 
                [0, 1],  
            ];
            directions.forEach(([dx, dy]) => {
                let r = rowIdx + dx;
                let c = colIdx + dy;
                while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                    const targetPiece = board[r][c];
                    if (targetPiece === "") {
                        validMoves.push([r, c]);  
                    } else if (!isAllyPiece(piece, r, c)) {
                        validMoves.push([r, c]);  
                        break; // On arrête si on rencontre une pièce ennemie
                    } else {
                        break; // Arrêt si c'est une pièce alliée
                    }
                    r += dx;
                    c += dy;
                }
            });
        }

        // Mouvement du Cavalier (♘ / ♞)
        if (piece === "♘" || piece === "♞") {
            const knightMoves: [number, number][] = [
                [-2, -1], [-2, 1], [2, -1], [2, 1],
                [-1, -2], [-1, 2], [1, -2], [1, 2],
            ];
            knightMoves.forEach(([dx, dy]) => {
                const r = rowIdx + dx;
                const c = colIdx + dy;
                if (r >= 0 && r < 8 && c >= 0 && c < 8 && !isAllyPiece(piece, r, c)) {
                    validMoves.push([r, c]);
                }
            });
        }

        // Mouvement du Fou (♗ / ♝)
        if (piece === "♗" || piece === "♝") {
            const directions: [number, number][] = [
                [-1, -1], 
                [-1, 1],  
                [1, -1],  
                [1, 1],   
            ];

            directions.forEach(([dx, dy]) => {
                let r = rowIdx + dx;
                let c = colIdx + dy;
                while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === "") {
                    // La case est vide, donc le mouvement est valide
                    validMoves.push([r, c]);
                    r += dx;
                    c += dy;
                }
                // Si la case est occupée par une pièce ennemie, le mouvement est valide jusqu'à cette case
                if (r >= 0 && r < 8 && c >= 0 && c < 8 && !isAllyPiece(piece, r, c) && board[r][c] !== "") {
                    validMoves.push([r, c]);
                }
            });
        }


        // Mouvement de la Reine (♕ / ♛)
        if (piece === "♕" || piece === "♛") {
            const directions: [number, number][] = [
                [-1, 0], [1, 0], [0, -1], [0, 1], 
                [-1, -1], [-1, 1], [1, -1], [1, 1], 
            ];
            directions.forEach(([dx, dy]) => {
                let r = rowIdx + dx;
                let c = colIdx + dy;
                while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                    const targetPiece = board[r][c];
                    if (targetPiece === "") {
                        validMoves.push([r, c]);  
                    } else if (!isAllyPiece(piece, r, c)) {
                        validMoves.push([r, c]);  
                        break; // On arrête si on rencontre une pièce ennemie
                    } else {
                        break; // Arrêt si c'est une pièce alliée
                    }
                    r += dx;
                    c += dy;
                }
            });
        }


        // Mouvement du Roi (♔ / ♚)
        if (piece === "♔" || piece === "♚") {
            // console.log("rois.",piece,);
            const kingMoves: [number, number][] = [
                [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1],
            ];
            kingMoves.forEach(([dx, dy]) => {
                const r = rowIdx + dx;
                const c = colIdx + dy;
                if (r >= 0 && r < 8 && c >= 0 && c < 8 && !isAllyPiece(piece, r, c)) {
                    validMoves.push([r, c]);
                }
            });
        }

        return validMoves;
    };

    return { isAllyPiece, calculateValidMoves };
};
