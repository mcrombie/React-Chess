/**
 * PAWN MOVEMENT
 */
export function pawnForwardMovement(state, tileId, pieceColor) {
    const possibleMoves = [];
    const firstMoveDistance = tileId[1] === '7' || tileId[1] === '2' ? 2 : 1;

    for (let i = 1; i <= firstMoveDistance; i++) {
        const tileOptionId = pieceColor === 'black'
            ? tileId[0] + (parseInt(tileId[1], 10) - i)
            : tileId[0] + (parseInt(tileId[1], 10) + i);
        const tileOption = state[tileOptionId];

        if (typeof tileOption === 'undefined') {
            continue;
        }
        if (tileOption.piece.color === pieceColor) {
            break;
        }
        if (tileOption.piece.color !== pieceColor && state[tileOptionId].piece.color !== 'none') {
            break;
        }

        possibleMoves.push(tileOptionId);
    }

    return possibleMoves;
}

export function pawnDiagonalMovement(state, tileId, pieceColor) {
    const possibleMoves = [];
    const currentTile = state[tileId];

    for (let i = -1; i <= 1; i += 2) {
        const tileOptionId = pieceColor === 'black'
            ? String.fromCharCode(tileId[0].charCodeAt(0) + i) + (parseInt(tileId[1], 10) - 1)
            : String.fromCharCode(tileId[0].charCodeAt(0) + i) + (parseInt(tileId[1], 10) + 1);
        const tileOption = state[tileOptionId];

        if (typeof tileOption === 'undefined') {
            continue;
        }
        if (tileOption.piece.color !== 'none' && tileOption.piece.color !== currentTile.piece.color) {
            possibleMoves.push(tileOptionId);
        }
        else if (tileOptionId === state.enPassant) {
            possibleMoves.push(tileOptionId);
        }
    }

    return possibleMoves;
}

export function enPassant() {
    return [];
}

/**
 * KNIGHT MOVEMENT
 */
export function knightMovement(state, tileId, pieceColor) {
    const possibleMoves = [];
    const knightMovementOptions = [
        String.fromCharCode(tileId[0].charCodeAt(0) + 1) + (parseInt(tileId[1], 10) + 2),
        String.fromCharCode(tileId[0].charCodeAt(0) + 2) + (parseInt(tileId[1], 10) + 1),
        String.fromCharCode(tileId[0].charCodeAt(0) + 2) + (parseInt(tileId[1], 10) - 1),
        String.fromCharCode(tileId[0].charCodeAt(0) + 1) + (parseInt(tileId[1], 10) - 2),
        String.fromCharCode(tileId[0].charCodeAt(0) - 1) + (parseInt(tileId[1], 10) - 2),
        String.fromCharCode(tileId[0].charCodeAt(0) - 2) + (parseInt(tileId[1], 10) - 1),
        String.fromCharCode(tileId[0].charCodeAt(0) - 2) + (parseInt(tileId[1], 10) + 1),
        String.fromCharCode(tileId[0].charCodeAt(0) - 1) + (parseInt(tileId[1], 10) + 2)
    ];

    for (let i = 0; i < knightMovementOptions.length; i++) {
        const tileOption = state[knightMovementOptions[i]];
        if (typeof tileOption === 'undefined' || tileOption.piece.color === pieceColor) {
            continue;
        }
        possibleMoves.push(tileOption.id);
    }

    return possibleMoves;
}

/**
 * DIAGONAL MOVEMENT - for bishops and queens
 */
export function diagonalMovement(state, tileId, pieceColor, distance) {
    const possibleMoves = [];
    const directions = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];

    directions.forEach(([fileDirection, rankDirection]) => {
        for (let i = 1; i <= distance; i++) {
            const tileOption = state[
                String.fromCharCode(tileId[0].charCodeAt(0) + (fileDirection * i))
                + (parseInt(tileId[1], 10) + (rankDirection * i))
            ];

            if (typeof tileOption === 'undefined') {
                break;
            }
            if (tileOption.piece.color === pieceColor && tileOption.piece.type === 'king' && state[tileId].piece.type === 'none') {
                possibleMoves.push(tileOption.id);
                break;
            }
            if (tileOption.piece.color === pieceColor) {
                break;
            }
            if (tileOption.piece.color !== pieceColor && tileOption.piece.color !== 'none') {
                possibleMoves.push(tileOption.id);
                break;
            }

            possibleMoves.push(tileOption.id);
        }
    });

    return possibleMoves;
}

/**
 * HORIZONTAL AND VERTICAL MOVEMENT - for rooks and queens
 */
export function horizontalAndVerticalMovement(state, tileId, pieceColor, distance) {
    const possibleMoves = [];
    const directions = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ];

    directions.forEach(([fileDirection, rankDirection]) => {
        for (let i = 1; i <= distance; i++) {
            const tileOption = state[
                String.fromCharCode(tileId[0].charCodeAt(0) + (fileDirection * i))
                + (parseInt(tileId[1], 10) + (rankDirection * i))
            ];

            if (typeof tileOption === 'undefined') {
                break;
            }
            if (tileOption.piece.color === pieceColor && tileOption.piece.type === 'king' && state[tileId].piece.type === 'none') {
                possibleMoves.push(tileOption.id);
                break;
            }
            if (tileOption.piece.color === pieceColor) {
                break;
            }
            if (tileOption.piece.color !== pieceColor && tileOption.piece.color !== 'none') {
                possibleMoves.push(tileOption.id);
                break;
            }

            possibleMoves.push(tileOption.id);
        }
    });

    return possibleMoves;
}

/**
 * Special castling movement support.
 */
export function castle(state, tileId, pieceColor) {
    const possibleMoves = [];
    let rookCastlePlacementLeft = { prevTile: 'none', newTile: 'none' };
    let rookCastlePlacementRight = { prevTile: 'none', newTile: 'none' };

    const canCastleWithRook = (rookTileId) => (
        state[rookTileId].piece.type === 'rook'
        && state[rookTileId].piece.color === pieceColor
        && !state[rookTileId].piece.hasMoved
    );

    if (state[tileId].piece.hasMoved) {
        return [possibleMoves, rookCastlePlacementLeft, rookCastlePlacementRight];
    }

    if (pieceColor === 'white') {
        let emptyOnLeft = true;
        for (let i = 1; i < 4; i++) {
            const neighborTile = state[String.fromCharCode(tileId[0].charCodeAt(0) - i) + tileId[1]];
            if (neighborTile.piece.type !== 'none') {
                emptyOnLeft = false;
            }
        }

        let emptyOnRight = true;
        for (let i = 1; i < 3; i++) {
            const neighborTile = state[String.fromCharCode(tileId[0].charCodeAt(0) + i) + tileId[1]];
            if (neighborTile.piece.type !== 'none') {
                emptyOnRight = false;
            }
        }

        const rookTileLeft = String.fromCharCode(tileId[0].charCodeAt(0) - 4) + tileId[1];
        if (canCastleWithRook(rookTileLeft) && emptyOnLeft) {
            possibleMoves.push(String.fromCharCode(tileId[0].charCodeAt(0) - 2) + tileId[1]);
            rookCastlePlacementLeft = {
                prevTile: rookTileLeft,
                newTile: String.fromCharCode(tileId[0].charCodeAt(0) - 1) + tileId[1]
            };
        }

        const rookTileRight = String.fromCharCode(tileId[0].charCodeAt(0) + 3) + tileId[1];
        if (canCastleWithRook(rookTileRight) && emptyOnRight) {
            possibleMoves.push(String.fromCharCode(tileId[0].charCodeAt(0) + 2) + tileId[1]);
            rookCastlePlacementRight = {
                prevTile: rookTileRight,
                newTile: String.fromCharCode(tileId[0].charCodeAt(0) + 1) + tileId[1]
            };
        }
    }
    else if (pieceColor === 'black') {
        let emptyOnRight = true;
        for (let i = 1; i < 4; i++) {
            const neighborTile = state[String.fromCharCode(tileId[0].charCodeAt(0) - i) + tileId[1]];
            if (neighborTile.piece.type !== 'none') {
                emptyOnRight = false;
            }
        }

        let emptyOnLeft = true;
        for (let i = 1; i < 3; i++) {
            const neighborTile = state[String.fromCharCode(tileId[0].charCodeAt(0) + i) + tileId[1]];
            if (neighborTile.piece.type !== 'none') {
                emptyOnLeft = false;
            }
        }

        const rookTileRight = String.fromCharCode(tileId[0].charCodeAt(0) - 4) + tileId[1];
        if (canCastleWithRook(rookTileRight) && emptyOnRight) {
            possibleMoves.push(String.fromCharCode(tileId[0].charCodeAt(0) - 2) + tileId[1]);
            rookCastlePlacementRight = {
                prevTile: rookTileRight,
                newTile: String.fromCharCode(tileId[0].charCodeAt(0) - 1) + tileId[1]
            };
        }

        const rookTileLeft = String.fromCharCode(tileId[0].charCodeAt(0) + 3) + tileId[1];
        if (canCastleWithRook(rookTileLeft) && emptyOnLeft) {
            possibleMoves.push(String.fromCharCode(tileId[0].charCodeAt(0) + 2) + tileId[1]);
            rookCastlePlacementLeft = {
                prevTile: rookTileLeft,
                newTile: String.fromCharCode(tileId[0].charCodeAt(0) + 1) + tileId[1]
            };
        }
    }

    return [possibleMoves, rookCastlePlacementLeft, rookCastlePlacementRight];
}
