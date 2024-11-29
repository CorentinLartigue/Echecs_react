export const useChessUtils = (
    board: string[][],
    whitePieces: string[],
    blackPieces: string[]
) => {
    // Vérifie si la pièce cible est une pièce alliée.
    const isAllyPiece = (piece: string, targetRow: number, targetCol: number): boolean => {
        const targetPiece = board[targetRow][targetCol];
        if (!targetPiece) return false; // Case vide
        // Si la pièce courante est blanche et la cible est aussi blanche, ou si la pièce courante est noire et la cible est aussi noire, c'est une pièce alliée.
        if (whitePieces.includes(piece) && whitePieces.includes(targetPiece)) return true;
        if (blackPieces.includes(piece) && blackPieces.includes(targetPiece)) return true;
        return false; // C'est une pièce ennemie
    };

    // Calcule les mouvements valides d'une pièce
    const calculateValidMoves = (piece: string, rowIdx: number, colIdx: number): [number, number][] => {
        const validMoves: [number, number][] = [];

        // Mouvement du Pion (♙ / ♟)
        if (piece === "♙" || piece === "♟") {
            const direction = piece === "♙" ? -1 : 1; // Les blancs vont vers le haut (rowIdx - 1), les noirs vers le bas (rowIdx + 1)
            
            // Avancer d'une case
            if (board[rowIdx + direction]?.[colIdx] === "") {
                validMoves.push([rowIdx + direction, colIdx]);
            }
            
            // Avancer de deux cases si c'est la position initiale
            if ((piece === "♙" && rowIdx === 6) || (piece === "♟" && rowIdx === 1)) {
                if (board[rowIdx + direction * 2]?.[colIdx] === "") {
                    validMoves.push([rowIdx + direction * 2, colIdx]);
                }
            }
            
            // Capturer en diagonale
            const captureDirections = [-1, 1]; // Gauche (-1), Droite (+1)
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
                [-1, 0], // Haut
                [1, 0],  // Bas
                [0, -1], // Gauche
                [0, 1],  // Droite
            ];
            directions.forEach(([dx, dy]) => {
                let r = rowIdx + dx;
                let c = colIdx + dy;
                while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                    const targetPiece = board[r][c];
                    if (targetPiece === "") {
                        validMoves.push([r, c]);  // Case vide
                    } else if (!isAllyPiece(piece, r, c)) {
                        validMoves.push([r, c]);  // Capture ennemie
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
                [-1, -1], // Haut-Gauche
                [-1, 1],  // Haut-Droite
                [1, -1],  // Bas-Gauche
                [1, 1],   // Bas-Droite
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
                [-1, 0], [1, 0], [0, -1], [0, 1], // Pour la tour
                [-1, -1], [-1, 1], [1, -1], [1, 1], // Pour le fou
            ];
            directions.forEach(([dx, dy]) => {
                let r = rowIdx + dx;
                let c = colIdx + dy;
                while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                    const targetPiece = board[r][c];
                    if (targetPiece === "") {
                        validMoves.push([r, c]);  // Case vide
                    } else if (!isAllyPiece(piece, r, c)) {
                        validMoves.push([r, c]);  // Capture ennemie
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
