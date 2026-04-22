function createPiece(type, color, hasMoved = false) {
    return { type, color, hasMoved };
}

function clonePiece(piece) {
    return { ...piece };
}

function createEmptyTile() {
    return createPiece("none", "none");
}

//WHITE PIECES
const whitePawn = createPiece("pawn", "white");
const whiteKnight = createPiece("knight", "white");
const whiteBishop = createPiece("bishop", "white");
const whiteRook = createPiece("rook", "white");
const whiteQueen = createPiece("queen", "white");
const whiteKing = createPiece("king", "white");

// BLACK PIECES
const blackPawn = createPiece("pawn", "black");
const blackKnight = createPiece("knight", "black");
const blackBishop = createPiece("bishop", "black");
const blackRook = createPiece("rook", "black");
const blackQueen = createPiece("queen", "black");
const blackKing = createPiece("king", "black");

const emptyTile = createEmptyTile();

export {
    createPiece,
    clonePiece,
    createEmptyTile,
    whitePawn,
    whiteKnight,
    whiteBishop,
    whiteRook,
    whiteQueen,
    whiteKing,
    blackPawn,
    blackKnight,
    blackBishop,
    blackRook,
    blackQueen,
    blackKing,
    emptyTile
};
