/**
 * PAWN MOVEMENT
 */
export function pawnForwardMovement(state, tileId, pieceColor) {
    let possibleMoves = [];

    let firstMoveVariable; //pawns can move two forward on their first move
    tileId[1] == 7 || tileId[1] == 2 ? firstMoveVariable = 2 : firstMoveVariable = 1;
    for (let i = 1; i <= firstMoveVariable; i++) {
        let tileOptionId;
        //black pieces start on top while white pieces on the bottom
        pieceColor == "black" ? tileOptionId = tileId[0] + (parseInt(tileId[1]) - i) : tileOptionId = tileId[0] + (parseInt(tileId[1]) + i);

        let tileOption = state[tileOptionId];
        //1. The tile option is not on the board (this one may not be needed once piece conversion is added)
        if (typeof tileOption === "undefined") { continue }
        //2. can't move to a tile you already have a piece on
        else if (tileOption.piece.color == pieceColor) { break }
        //3. if you come to a tile with an enemy piece
        else if (tileOption.piece.color != pieceColor && state[tileOptionId].piece.color != "none") {
            // possibleMoves.push(tileOptionId);
            break;
        }
        //4. if all tiles ahead are empty
        else {
            possibleMoves.push(tileOptionId);
        }
    }
    return possibleMoves;
}

export function pawnDiagonalMovement(state, tileId, pieceColor) {
    let possibleMoves = [];
    let currentTile = state[tileId];

    for (let i = -1; i <= 1; i += 2) {
        let tileOptionId;
        //for black on top
        pieceColor == "black" ? tileOptionId = String.fromCharCode(tileId[0].charCodeAt(0) + i) + (parseInt(tileId[1]) - 1)
            : tileOptionId = String.fromCharCode(tileId[0].charCodeAt(0) + i) + (parseInt(tileId[1]) + 1);

        let tileOption = state[tileOptionId];
        //The tile option is not on the board (this one may not be needed once piece conversion is added)
        if (typeof tileOption === "undefined") { continue }
        //only allow diagonal if there is an enemy piece there
        if (tileOption.piece.color != "none" && tileOption.piece.color != currentTile.piece.color) { possibleMoves.push(tileOptionId) }
        else if (tileOptionId == state.enPassant){possibleMoves.push(tileOptionId)};
    }
    return possibleMoves;
}
export function enPassant(state, tileId, pieceColor){
    let possibleMoves = [];

    return possibleMoves;
}
/**
 * KNIGHT MOVEMENT
 */
export function knightMovement(state, tileId, pieceColor) {
    let possibleMoves = [];

    let topRight = String.fromCharCode(tileId[0].charCodeAt(0) + 1) + (parseInt(tileId[1]) + 2);
    let upperRightMid = String.fromCharCode(tileId[0].charCodeAt(0) + 2) + (parseInt(tileId[1]) + 1);
    let lowerRightMid = String.fromCharCode(tileId[0].charCodeAt(0) + 2) + (parseInt(tileId[1]) - 1);
    let bottomRight = String.fromCharCode(tileId[0].charCodeAt(0) + 1) + (parseInt(tileId[1]) - 2);
    let bottomLeft = String.fromCharCode(tileId[0].charCodeAt(0) - 1) + (parseInt(tileId[1]) - 2);
    let lowerLeftMid = String.fromCharCode(tileId[0].charCodeAt(0) - 2) + (parseInt(tileId[1]) - 1);
    let upperLeftMid = String.fromCharCode(tileId[0].charCodeAt(0) - 2) + (parseInt(tileId[1]) + 1);
    let topLeft = String.fromCharCode(tileId[0].charCodeAt(0) - 1) + (parseInt(tileId[1]) + 2);

    let knightMovementOptions = [topRight, upperRightMid, lowerRightMid, bottomRight, bottomLeft, lowerLeftMid, upperLeftMid, topLeft];
    for (let i = 0; i < knightMovementOptions.length; i++) {
        let tileOption = state[knightMovementOptions[i]];
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { continue }
        else { possibleMoves.push(tileOption.id) }
    }
    return possibleMoves;
}
/**
 * DIAGONAL MOVEMENT - for bishops and queens
 */
export function diagonalMovement(state, tileId, pieceColor, distance) {
    let possibleMoves = [];

    //up and right
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) + i)) + (parseInt(tileId[1]) + parseInt(i))]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //down and right
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) + i)) + (parseInt(tileId[1]) - parseInt(i))]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //up and left
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) - i)) + (parseInt(tileId[1]) + parseInt(i))]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //down and left
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) - i)) + (parseInt(tileId[1]) - parseInt(i))]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    return possibleMoves;
}
/**
 * HORIZONTAL AND VERTICAL MOVEMENT -  for rooks and queens
 */
export function horizontalAndVerticalMovement(state, tileId, pieceColor, distance) {
    //I COULD PROBABLY WRITE A FUNCTION THAT DOES THESE FOR LOOPS WITHOUT ME REWRITING CODE SO MUCH
    let possibleMoves = [];
    //left
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) - i)) + tileId[1]]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //right
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[(String.fromCharCode(tileId[0].charCodeAt(0) + i)) + tileId[1]]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //up
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[tileId[0] + (parseInt(tileId[1]) + i)]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }
    //down
    for (let i = 1; i <= distance; i++) {
        let tileOption = state[tileId[0] + (parseInt(tileId[1]) - i)]
        if (typeof tileOption === "undefined" || tileOption.piece.color == pieceColor) { break }
        else if (tileOption.piece.color != pieceColor && tileOption.piece.color != "none") {
            possibleMoves.push(tileOption.id);
            break;
        }
        else { possibleMoves.push(tileOption.id) }
    }

    return possibleMoves;
}

export function castle(state, tileId, pieceColor){
    let possibleMoves = [];
    let rookCastlePlacement;
    console.log("castle activated")
    //if the king has not moved a castle may be possible
    if(!state[tileId].piece.hasMoved){
        if(pieceColor == "white"){
            console.log("castle piece type is white")
            //ensure all tiles up to the rook are empty
            for(let i = 1; i < 4; i++){
                let neighborTile = state[(String.fromCharCode(tileId[0].charCodeAt(0) - i)) + tileId[1]];
                if(neighborTile.piece.type != "none"){
                    console.log(`not empty at ${i}`)
                    return [possibleMoves, {prevTile:"none", newTile:"none"}];
                }
            }
            console.log("all empty tiles to left")
            //check for an unmoved rook to castle with
            let rookTile = (String.fromCharCode(tileId[0].charCodeAt(0) - 4)) + tileId[1];
            console.log(`this is the rook tile: ${rookTile}`)
            console.log(`type is ${state[rookTile].piece.type}`)
            console.log(`hasMoved is ${state[rookTile].piece.hasMoved}`)
            console.log(state[rookTile].piece.type == "rook" && state[rookTile].hasMoved == false)
            if(state[rookTile].piece.type == "rook" && !state[rookTile].hasMoved){
                let newKingTile = (String.fromCharCode(tileId[0].charCodeAt(0) - 2)) + tileId[1];
                console.log(`This is the new tile for the king: ${newKingTile}`)
                possibleMoves.push(newKingTile);
            }
            rookCastlePlacement = {
                prevTile: ((String.fromCharCode(tileId[0].charCodeAt(0) - 4))) + tileId[1],
                newTile: ((String.fromCharCode(tileId[0].charCodeAt(0) - 1))) + tileId[1]
            }
        }



    }
    return [possibleMoves, rookCastlePlacement];
}
