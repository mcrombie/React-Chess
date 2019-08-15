//WHITE PIECES
const whitePawn = { type: "pawn", color: "white", hasMoved:false }
const whiteKnight = { type: "knight", color: "white", hasMoved:false }
const whiteBishop = { type: "bishop", color: "white", hasMoved:false }
const whiteRook = { type: "rook", color: "white", hasMoved:false }
const whiteQueen = { type: "queen", color: "white", hasMoved:false }
const whiteKing = { type: "king", color: "white", hasMoved:false }

// BLACK PIECES
const blackPawn = { type: "pawn", color: "black", hasMoved:false }
const blackKnight = { type: "knight", color: "black", hasMoved:false }
const blackBishop = { type: "bishop", color: "black", hasMoved:false }
const blackRook = { type: "rook", color: "black", hasMoved:false }
const blackQueen = { type: "queen", color: "black", hasMoved:false }
const blackKing = { type: "king", color: "black", hasMoved:false }

const emptyTile = {type:"none",color:"none", hasMoved:false}

export { whitePawn, whiteKnight, whiteBishop, whiteRook, whiteQueen, whiteKing, blackPawn, blackKnight, blackBishop, 
    blackRook, blackQueen, blackKing, emptyTile };