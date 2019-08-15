/**
 * My design for this code fell apart as i hit so many bumps and learned som many things along the way. 
 * Turns out coding chess is simle enough for me to do at my current level but too hard for me to do well.
 * I know this code must be a mess to any experienced react developer. My apologies. This is not a professional
 * project. It is strictly for my own education and entertainment. It is not meant as a practical application, 
 * though you could certainly use it to play.
 * 
 * -Michael Crombie 8/11/2019
 */



import React from 'react';
import '../css/App.css';
import * as pieces from '../pieces/pieces.js';
import { pawnForwardMovement, pawnDiagonalMovement, enPassant, knightMovement, diagonalMovement, horizontalAndVerticalMovement, castle } from '../pieces/moves';
// import { create } from 'domain';

const MAX_DISTANCE = 7;
const MIN_DISTANCE = 1;
const DEFAULTSTATE = {
  playerTurn: "white",
  selectedTile: "none",
  possibleMoves: [],
  pawnToConvert: "none",
  enPassant: "none",
  rookCastlePlacement: { prevTile: "none", newTile: "none" },
  whiteGraveyard: [],
  blackGraveyard: [],
  showTurnDisplay: true,
  showPossibleMoves: false,
  showQuoteGenerator: true,
  showGraveyards: true,
  shouldRotate: false,
  // ROW 8
  A8: { id: "A8", tileColor: "light", piece: pieces.blackRook },
  B8: { id: "B8", tileColor: "dark", piece: pieces.blackKnight },
  C8: { id: "C8", tileColor: "light", piece: pieces.blackBishop },
  D8: { id: "D8", tileColor: "dark", piece: pieces.blackQueen },
  E8: { id: "E8", tileColor: "light", piece: pieces.blackKing },
  F8: { id: "F8", tileColor: "dark", piece: pieces.blackBishop },
  G8: { id: "G8", tileColor: "light", piece: pieces.blackKnight },
  H8: { id: "H8", tileColor: "dark", piece: pieces.blackRook },
  // ROW 7
  A7: { id: "A7", tileColor: "dark", piece: pieces.blackPawn },
  B7: { id: "B7", tileColor: "light", piece: pieces.blackPawn },
  C7: { id: "C7", tileColor: "dark", piece: pieces.blackPawn },
  D7: { id: "D7", tileColor: "light", piece: pieces.blackPawn },
  E7: { id: "E7", tileColor: "dark", piece: pieces.blackPawn },
  F7: { id: "F7", tileColor: "light", piece: pieces.blackPawn },
  G7: { id: "G7", tileColor: "dark", piece: pieces.blackPawn },
  H7: { id: "H7", tileColor: "light", piece: pieces.blackPawn },
  // ROW 6
  A6: { id: "A6", tileColor: "light", piece: pieces.emptyTile },
  B6: { id: "B6", tileColor: "dark", piece: pieces.emptyTile },
  C6: { id: "C6", tileColor: "light", piece: pieces.emptyTile },
  D6: { id: "D6", tileColor: "dark", piece: pieces.emptyTile },
  E6: { id: "E6", tileColor: "light", piece: pieces.emptyTile },
  F6: { id: "F6", tileColor: "dark", piece: pieces.emptyTile },
  G6: { id: "G6", tileColor: "light", piece: pieces.emptyTile },
  H6: { id: "H6", tileColor: "dark", piece: pieces.emptyTile },
  // ROW 5
  A5: { id: "A5", tileColor: "dark", piece: pieces.emptyTile },
  B5: { id: "B5", tileColor: "light", piece: pieces.emptyTile },
  C5: { id: "C5", tileColor: "dark", piece: pieces.emptyTile },
  D5: { id: "D5", tileColor: "light", piece: pieces.emptyTile },
  E5: { id: "E5", tileColor: "dark", piece: pieces.emptyTile },
  F5: { id: "F5", tileColor: "light", piece: pieces.emptyTile },
  G5: { id: "G5", tileColor: "dark", piece: pieces.emptyTile },
  H5: { id: "H5", tileColor: "light", piece: pieces.emptyTile },
  // ROW 4
  A4: { id: "A4", tileColor: "light", piece: pieces.emptyTile },
  B4: { id: "B4", tileColor: "dark", piece: pieces.emptyTile },
  C4: { id: "C4", tileColor: "light", piece: pieces.emptyTile },
  D4: { id: "D4", tileColor: "dark", piece: pieces.emptyTile },
  E4: { id: "E4", tileColor: "light", piece: pieces.emptyTile },
  F4: { id: "F4", tileColor: "dark", piece: pieces.emptyTile },
  G4: { id: "G4", tileColor: "light", piece: pieces.emptyTile },
  H4: { id: "H4", tileColor: "dark", piece: pieces.emptyTile },
  // ROW 3
  A3: { id: "A3", tileColor: "dark", piece: pieces.emptyTile },
  B3: { id: "B3", tileColor: "light", piece: pieces.emptyTile },
  C3: { id: "C3", tileColor: "dark", piece: pieces.emptyTile },
  D3: { id: "D3", tileColor: "light", piece: pieces.emptyTile },
  E3: { id: "E3", tileColor: "dark", piece: pieces.emptyTile },
  F3: { id: "F3", tileColor: "light", piece: pieces.emptyTile },
  G3: { id: "G3", tileColor: "dark", piece: pieces.emptyTile },
  H3: { id: "H3", tileColor: "light", piece: pieces.emptyTile },
  // ROW 2
  A2: { id: "A2", tileColor: "light", piece: pieces.whitePawn },
  B2: { id: "B2", tileColor: "dark", piece: pieces.whitePawn },
  C2: { id: "C2", tileColor: "light", piece: pieces.whitePawn },
  D2: { id: "D2", tileColor: "dark", piece: pieces.whitePawn },
  E2: { id: "E2", tileColor: "light", piece: pieces.whitePawn },
  F2: { id: "F2", tileColor: "dark", piece: pieces.whitePawn },
  G2: { id: "G2", tileColor: "light", piece: pieces.whitePawn },
  H2: { id: "H2", tileColor: "dark", piece: pieces.whitePawn },
  // ROW 1
  A1: { id: "A1", tileColor: "dark", piece: pieces.whiteRook },
  B1: { id: "B1", tileColor: "light", piece: pieces.whiteKnight },
  C1: { id: "C1", tileColor: "dark", piece: pieces.whiteBishop },
  D1: { id: "D1", tileColor: "light", piece: pieces.whiteQueen },
  E1: { id: "E1", tileColor: "dark", piece: pieces.whiteKing },
  F1: { id: "F1", tileColor: "light", piece: pieces.whiteBishop },
  G1: { id: "G1", tileColor: "dark", piece: pieces.whiteKnight },
  H1: { id: "H1", tileColor: "light", piece: pieces.whiteRook }
}

function removeTileStyling() {
  //remove all styling from previous selection
  let tiles = document.getElementsByClassName("tile");
  for (let i = 0; i < tiles.length; i++) { tiles[i].style = null; }
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(tileId) {
    console.log("clicked " + tileId)

    removeTileStyling();

    //If a piece has been selected, run logic
    //if(this.props.tile.piece.type != "none" || this.props.tile.potentialMove == true){this.props.onTileClick(tileId);}
    this.props.onTileClick(tileId);
  }
  render() {
    let renderedTile;
    let tileId = this.props.tile.id;
    let tileColor = this.props.tile.tileColor;
    let pieceType = this.props.tile.piece.type;
    let pieceColor = this.props.tile.piece.color;
    let tileClass = "tile " + tileColor
    //EMPTY TILES
    if (pieceType == "none") {
      renderedTile = (
        <div id={tileId} className={tileClass} onClick={this.handleClick.bind(this, tileId)}></div>
      )
    }
    //TILES OCCUPIED BY A PIECE
    else {
      let iconClass = "fas fa-chess-" + pieceType + " " + pieceColor
      renderedTile = (
        <div id={tileId} className={tileClass} onClick={this.handleClick.bind(this, tileId)}>
          <i className={iconClass}></i>
        </div>
      )
    }
    return (renderedTile)
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULTSTATE;
    this.handleTileClick = this.handleTileClick.bind(this);
    this.displayPossibleMoves = this.displayPossibleMoves.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.activatePieceSelection = this.activatePieceSelection.bind(this);
    this.convertPiece = this.convertPiece.bind(this);
    this.toggleTurnDisplay = this.toggleTurnDisplay.bind(this);
    this.togglePossibleMoves = this.togglePossibleMoves.bind(this);
    this.toggleQuoteGenerator = this.toggleQuoteGenerator.bind(this);
    this.toggleGraveyards = this.toggleGraveyards.bind(this);
    this.toggleRotate = this.toggleRotate.bind(this);
    this.rotateBoard = this.rotateBoard.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleTileClick(tileId) {
    let makingAMove = false;
    //Check if the tile clicked is a possible move
    for (let i = 0; i < this.state.possibleMoves.length; i++) {
      if (tileId == this.state.possibleMoves[i]) { makingAMove = true; }
    }
    //OPTION 1: MOVE TO THIS TILE
    if (makingAMove) {
      this.moveTo(tileId);
    }
    //OPTION 2: SELECTING A PIECE TO BE MOVED
    else if (this.state[tileId].piece.color == this.state.playerTurn) {
      //update the currently selected tile
      this.setState({
        selectedTile: tileId
      })

      let pieceColor = this.state[tileId].piece.color;
      let pieceType = this.state[tileId].piece.type;

      switch (pieceType) {
        case "pawn":
          this.calculatePawnMoves(tileId, pieceColor);
          return;
        case "knight":
          this.calculateKnightMoves(tileId, pieceColor);
          return;
        case "bishop":
          this.calculateBishopMoves(tileId, pieceColor);
          return;
        case "rook":
          this.calculateRookMoves(tileId, pieceColor);
          return;
        case "queen":
          this.calculateQueenMoves(tileId, pieceColor);
          return;
        case "king":
          this.calculateKingMoves(tileId, pieceColor);
          return;
        default:
          return;
      }
    }
    //OPTION 3: SELECTING EMPTY TILE THAT CAN'T BE MOVED TO
    else if (this.state[tileId].piece.color == "none") {
      //because we remove styling on piece selection, the board rotation must be called again
      this.rotateBoard();
    }
    //OPTION 4: SELECTED OPPONENT'S PIECE THAT CAN'T BE CAPTURED
    else {
      //because we remove styling on piece selection, the board rotation must be called again
      this.rotateBoard();
    }
  }
  moveTo(tileId) {
    let prevTile = this.state[this.state.selectedTile];
    let newTile = this.state[tileId];
    let movedPiece = prevTile.piece;
    movedPiece.hasMoved = true;
    this.setState({
      //add piece to new tile
      [newTile.id]: { id: newTile.id, tileColor: newTile.tileColor, piece: movedPiece },
      //remove piece from previous tile and add to graveyard
      [prevTile.id]: { id: prevTile.id, tileColor: prevTile.tileColor, piece: pieces.emptyTile },
      //return to defaults
      selectedTile: "none",
      possibleMoves: []
    })
    //update graveyard
    if (newTile.piece.color != "none") { this.grimReaper(newTile) };
    this.changeTurn();

    //pawn reaches other end of board
    if (prevTile.piece.type == "pawn" && (tileId[1] == "1" || tileId[1] == "8")) {
      this.activatePieceSelection(tileId);
    }

    //set state for en passant
    if (prevTile.piece.type == "pawn" && (newTile.id[1] == (parseInt(prevTile.id[1]) + 2) || newTile.id[1] == (parseInt(prevTile.id[1]) - 2))) {
      let enPassant;
      if (newTile.id[1] == (parseInt(prevTile.id[1]) + 2)) {
        enPassant = prevTile.id[0] + (parseInt(prevTile.id[1]) + 1)
      }
      else if (newTile.id[1] == (prevTile.id[1] - 2)) {
        enPassant = prevTile.id[0] + (parseInt(prevTile.id[1]) - 1);
      }
      this.setState({
        enPassant: enPassant
      })
    }

    //check if moving into en passant tile
    if (tileId == this.state.enPassant) {
      let pieceToCapture;
      if (prevTile.piece.color == "white") {
        pieceToCapture = this.state.enPassant[0] + (parseInt(this.state.enPassant[1]) - 1);
      }
      else if (prevTile.piece.color == "black") {
        pieceToCapture = this.state.enPassant[0] + (parseInt(this.state.enPassant[1]) + 1);
      }
      this.setState({
        [pieceToCapture]: {
          id: this.state[pieceToCapture].id,
          tileColor: this.state[pieceToCapture].tileColor,
          piece: pieces.emptyTile
        }
      })
    }

    //castling
    if (prevTile.piece.type == "king" && this.state.rookCastlePlacement.prevTile != "none") {
      let newTile = this.state[this.state.rookCastlePlacement.newTile];
      let prevTile = this.state[this.state.rookCastlePlacement.prevTile];
      let movedPiece = prevTile.piece;
      movedPiece.hasMoved = true;
      this.setState({
        //add piece to new tile
        [newTile.id]: { id: newTile.id, tileColor: newTile.tileColor, piece: movedPiece },
        //remove piece from previous tile and add to graveyard
        [prevTile.id]: { id: prevTile.id, tileColor: prevTile.tileColor, piece: pieces.emptyTile },
        rookCastlePlacement:{prevTile:"none", newTile:"none"}
      })
    }
  }

  calculatePawnMoves(tileId, pieceColor) {
    let pawnMoves = [];
    //1. Getting forward movement options
    pawnForwardMovement(this.state, tileId, pieceColor).forEach((tile) => { pawnMoves.push(tile) });
    //2. Getting diagonal options
    pawnDiagonalMovement(this.state, tileId, pieceColor).forEach((tile) => { pawnMoves.push(tile) });
    //3. Check for en passant
    enPassant(this.state, tileId, pieceColor).forEach((tile) => { pawnMoves.push(tile) });
    //4. Update the state
    this.setState({
      possibleMoves: pawnMoves
    })
  }
  calculateKnightMoves(tileId, pieceColor) {
    let knightMoves = [];
    //1. get move options for knight
    knightMovement(this.state, tileId, pieceColor).forEach((tile) => { knightMoves.push(tile) });
    //2. Update the state
    this.setState({
      possibleMoves: knightMoves
    })
  }
  calculateBishopMoves(tileId, pieceColor) {
    let bishopMoves = [];

    //1. get diagonal move options
    diagonalMovement(this.state, tileId, pieceColor, MAX_DISTANCE).forEach((tile) => { bishopMoves.push(tile) });
    //2. Update the state
    this.setState({
      possibleMoves: bishopMoves
    })
  }
  calculateRookMoves(tileId, pieceColor) {
    let rookMoves = [];

    //1. get horizontal and vertical move options using max distance
    horizontalAndVerticalMovement(this.state, tileId, pieceColor, MAX_DISTANCE).forEach((tile) => { rookMoves.push(tile) });
    //2. Update the state
    this.setState({
      possibleMoves: rookMoves
    })
  }
  calculateQueenMoves(tileId, pieceColor) {
    let queenMoves = [];

    //1. get horizontal and vertical move options using max distance
    horizontalAndVerticalMovement(this.state, tileId, pieceColor, MAX_DISTANCE).forEach((tile) => { queenMoves.push(tile) });
    //2. get diagonal move options using max distance
    diagonalMovement(this.state, tileId, pieceColor, MAX_DISTANCE).forEach((tile) => { queenMoves.push(tile) });
    //3. Update the state
    this.setState({
      possibleMoves: queenMoves
    })
  }
  calculateKingMoves(tileId, pieceColor) {
    let kingMoves = [];

    //1. get horizontal and vertical move options
    horizontalAndVerticalMovement(this.state, tileId, pieceColor, MIN_DISTANCE).forEach((tile) => { kingMoves.push(tile) });
    //2. get diagonal move options
    diagonalMovement(this.state, tileId, pieceColor, MIN_DISTANCE).forEach((tile) => { kingMoves.push(tile) });
    //3. castle movement
    let castling = castle(this.state, tileId, pieceColor);
    let castlePotentialMove = castling[0];
    castlePotentialMove.forEach((tile) => { kingMoves.push(tile) });
    let rookCastlePlacement = castling[1];
    //4. Update the state
    this.setState({
      possibleMoves: kingMoves,
      rookCastlePlacement: rookCastlePlacement
    })
  }
  displayPossibleMoves() {
    for (let i = 0; i < this.state.possibleMoves.length; i++) {
      let possibleMove = this.state.possibleMoves[i];
      document.getElementById(possibleMove).style = "background-color:green"; //change color to show availability
    }
  }
  changeTurn() {
    let newPlayerTurn;
    this.state.playerTurn == "white" ? newPlayerTurn = "black" : newPlayerTurn = "white"
    this.setState({
      playerTurn: newPlayerTurn
    })
  }
  //opens the options for selecting a new piece when a pawn has reached the opposite end of the board
  activatePieceSelection(tileId) {
    this.setState({
      pawnToConvert: tileId
    })
    document.getElementById("piece-selector-box").style = "display:block";
  }
  //converts a pawn that has reached the other end of the board to another piece
  convertPiece(pieceType) {
    //get the piece color rather roundaboutly
    let pieceColor;
    this.state.pawnToConvert[1] == "8" ? pieceColor = "white" : pieceColor = "black";
    //update the  state with your piece selection
    this.setState({
      [this.state.pawnToConvert]: {
        id: this.state[this.state.pawnToConvert].id,
        tileColor: this.state[this.state.pawnToConvert].tileColor,
        piece: { type: pieceType, color: pieceColor, hasMoved: true }
      }
    })
    //make piece selection dissapear...SHAZAAM!
    document.getElementById("piece-selector-box").style = "display:none";
  }
  //moves pieces to the grave yard
  grimReaper(tile) {
    let updatedGraveyard = this.state[tile.piece.color + "Graveyard"];
    updatedGraveyard.push(tile.piece);
    this.setState({
      [tile.piece.color + "Graveyard"]: updatedGraveyard
    })
  }
  //creates the html elements to represent pieces in the graveyard
  createGraveyardElement(piece, i) {
    let iconClass = "fas fa-chess-" + piece.type + " " + piece.color + " " + "graveyard-piece"
    return (<div key={i}><i className={iconClass}></i></div>)
  }
  toggleTurnDisplay() {
    this.setState({
      showTurnDisplay: !this.state.showTurnDisplay
    })
    !this.state.showTurnDisplay ? document.getElementById("player-turn-display").style = "display:block" : document.getElementById("player-turn-display").style = "display:none";
  }
  togglePossibleMoves() {
    this.setState({
      showPossibleMoves: !this.state.showPossibleMoves
    })
    removeTileStyling();
  }
  toggleQuoteGenerator() {
    this.setState({
      showQuoteGenerator: !this.state.showQuoteGenerator
    })
    !this.state.showQuoteGenerator ? document.getElementById("quote-generator").style = "display:block" : document.getElementById("quote-generator").style = "display:none";
  }
  toggleGraveyards() {
    this.setState({
      showGraveyards: !this.state.showGraveyards
    })
    !this.state.showGraveyards ? document.getElementById("white-graveyard").style = "display:block" : document.getElementById("white-graveyard").style = "display:none";
    !this.state.showGraveyards ? document.getElementById("black-graveyard").style = "display:block" : document.getElementById("black-graveyard").style = "display:none";
  }
  toggleRotate() {
    this.setState({
      shouldRotate: !this.state.shouldRotate
    })
    this.rotateBoard()
  }
  rotateBoard() {
    let degrees;
    this.state.shouldRotate ? degrees = "180deg" : degrees = "0deg";
    document.getElementById("board").style = `transform:rotate(${degrees})`;
    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].style = `transform:rotate(${degrees})`;
    }
  }
  reset() {
    this.setState(DEFAULTSTATE)
  }
  render() {
    //change background color to indicate when a tile is selected
    if (this.state.selectedTile != "none") {
      document.getElementById(this.state.selectedTile).style = "background-color:navy";
    }
    //creating graveyards
    let whiteGravePieces = this.state.whiteGraveyard.map(this.createGraveyardElement)
    let blackGravePieces = this.state.blackGraveyard.map(this.createGraveyardElement)

    //rotate board
    if (document.getElementById("board") != null) { this.rotateBoard(); }

    //toggling possible moves display
    if (this.state.showPossibleMoves) { this.displayPossibleMoves() };

    return (
      <div id="board-and-options-container">
        <div id="board-container">
          <div id="white-graveyard">
            <h2 className="graveyard-title">White Graveyard<i className="fas fa-scythe"></i></h2>
            <div className="graveyard-pieces">
              {whiteGravePieces}
            </div>
          </div>
          <div id="board">
            {/* ROW 8*/}
            <Tile tile={this.state.A8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G8} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H8} onTileClick={this.handleTileClick} />
            {/* ROW 7 */}
            <Tile tile={this.state.A7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G7} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H7} onTileClick={this.handleTileClick} />
            {/* ROW 6 */}
            <Tile tile={this.state.A6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G6} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H6} onTileClick={this.handleTileClick} />
            {/* ROW 5 */}
            <Tile tile={this.state.A5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G5} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H5} onTileClick={this.handleTileClick} />
            {/* ROW 4 */}
            <Tile tile={this.state.A4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G4} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H4} onTileClick={this.handleTileClick} />
            {/* ROW 3 */}
            <Tile tile={this.state.A3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G3} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H3} onTileClick={this.handleTileClick} />
            {/* ROW 2 */}
            <Tile tile={this.state.A2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G2} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H2} onTileClick={this.handleTileClick} />
            {/* ROW 1 */}
            <Tile tile={this.state.A1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.B1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.C1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.D1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.E1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.F1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.G1} onTileClick={this.handleTileClick} />
            <Tile tile={this.state.H1} onTileClick={this.handleTileClick} />

          </div>
          <div id="black-graveyard">
            <h2 className="graveyard-title">Black Graveyard</h2>
            <div className="graveyard-pieces">
              {blackGravePieces}
            </div>
          </div>

        </div>
        <div id="player-turn-display">{this.state.playerTurn.toUpperCase()} PLAYER'S TURN</div>
        <form id="options-container">
          <label>Turn Display
            <input name="turn-display" type="checkbox" checked={this.state.showTurnDisplay} onChange={this.toggleTurnDisplay}></input>
          </label>
          <label>Possible Moves
            <input name="possible-moves" type="checkbox" checked={this.state.showPossibleMoves} onChange={this.togglePossibleMoves}></input>
          </label>
          <label>Quote Generator
            <input name="quote-generator" type="checkbox" checked={this.state.showQuoteGenerator} onChange={this.toggleQuoteGenerator}></input>
          </label>
          <label>Graveyards
            <input name="graveyards" type="checkbox" checked={this.state.showGraveyards} onChange={this.toggleGraveyards}></input>
          </label>
          <label>Rotate Board
            <input name="rotate-board" type="checkbox" onChange={this.toggleRotate}></input>
          </label>

          <button type="button" onClick={this.reset}>Reset</button>
        </form>
        <div id="piece-selector-box">
          <h3 id="piece-selector-title">Select a new piece</h3>
          <div id="piece-selector">
            <div className="piece-option" onClick={this.convertPiece.bind(this, "knight")}><i className="fas fa-chess-knight"></i></div>
            <div className="piece-option" onClick={this.convertPiece.bind(this, "bishop")}><i className="fas fa-chess-bishop"></i></div>
            <div className="piece-option" onClick={this.convertPiece.bind(this, "rook")}><i className="fas fa-chess-rook"></i></div>
            <div className="piece-option" onClick={this.convertPiece.bind(this, "queen")}><i className="fas fa-chess-queen"></i></div>
          </div>
        </div>
      </div>
    );
  };

}

export default Board;
