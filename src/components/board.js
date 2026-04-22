/**
 * My design for this code fell apart as i hit so many bumps and learned so many things along the way.
 * Turns out coding chess is simple enough for me to do at my current level but too hard for me to do well.
 * I know this code must be a mess to any experienced react developer. My apologies. This is not a professional
 * project. It is strictly for my own education and entertainment. It is not meant as a practical application,
 * though you could certainly use it to play.
 *
 * -Michael Crombie 8/11/2019
 */

import React from 'react';
import '../css/App.css';
import * as pieces from '../pieces/pieces.js';
import {
  pawnForwardMovement,
  pawnDiagonalMovement,
  knightMovement,
  diagonalMovement,
  horizontalAndVerticalMovement,
  castle
} from '../pieces/moves';

const MAX_DISTANCE = 7;
const MIN_DISTANCE = 1;
const FILES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
const BOARD_TILE_IDS = RANKS.flatMap((rank) => FILES.map((file) => `${file}${rank}`));

function getOppositePieceColor(pieceColor) {
  if (pieceColor === 'white') {
    return 'black';
  }
  if (pieceColor === 'black') {
    return 'white';
  }
  return 'none';
}

function getTileColor(file, rank) {
  const fileIndex = FILES.indexOf(file);
  return (fileIndex + rank) % 2 === 0 ? 'light' : 'dark';
}

function createTile(tileId, piece = pieces.createEmptyTile()) {
  return {
    id: tileId,
    tileColor: getTileColor(tileId[0], parseInt(tileId[1], 10)),
    piece
  };
}

function createStartingPiece(tileId) {
  const file = tileId[0];
  const rank = parseInt(tileId[1], 10);
  const backRankPieces = {
    A: 'rook',
    B: 'knight',
    C: 'bishop',
    D: 'queen',
    E: 'king',
    F: 'bishop',
    G: 'knight',
    H: 'rook'
  };

  if (rank === 2) {
    return pieces.createPiece('pawn', 'white');
  }
  if (rank === 7) {
    return pieces.createPiece('pawn', 'black');
  }
  if (rank === 1) {
    return pieces.createPiece(backRankPieces[file], 'white');
  }
  if (rank === 8) {
    return pieces.createPiece(backRankPieces[file], 'black');
  }
  return pieces.createEmptyTile();
}

function cloneState(state) {
  const nextState = {
    ...state,
    possibleMoves: [...state.possibleMoves],
    whiteGraveyard: [...state.whiteGraveyard],
    blackGraveyard: [...state.blackGraveyard]
  };

  BOARD_TILE_IDS.forEach((tileId) => {
    nextState[tileId] = {
      ...state[tileId],
      piece: pieces.clonePiece(state[tileId].piece)
    };
  });

  return nextState;
}

function createDefaultState() {
  const defaultState = {
    playerTurn: 'white',
    selectedTile: 'none',
    possibleMoves: [],
    pawnToConvert: 'none',
    enPassant: 'none',
    check: false,
    checkMate: false,
    staleMate: false,
    winner: 'none',
    whiteGraveyard: [],
    blackGraveyard: [],
    showTurnDisplay: true,
    showPossibleMoves: false,
    showQuoteGenerator: true,
    showGraveyards: true,
    shouldRotate: false
  };

  BOARD_TILE_IDS.forEach((tileId) => {
    defaultState[tileId] = createTile(tileId, createStartingPiece(tileId));
  });

  return defaultState;
}

function Tile({ tile, isSelected, isPossibleMove, isRotated, onTileClick }) {
  const tileClasses = [
    'tile',
    tile.tileColor,
    isSelected ? 'selected-tile' : '',
    isPossibleMove ? 'possible-move' : '',
    isRotated ? 'rotated-tile' : ''
  ].filter(Boolean).join(' ');

  const iconClass = `fas fa-chess-${tile.piece.type} ${tile.piece.color}`;

  return (
    <div id={tile.id} className={tileClasses} onClick={() => onTileClick(tile.id)}>
      {tile.piece.type !== 'none' ? <i className={iconClass}></i> : null}
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = createDefaultState();

    this.handleTileClick = this.handleTileClick.bind(this);
    this.convertPiece = this.convertPiece.bind(this);
    this.toggleTurnDisplay = this.toggleTurnDisplay.bind(this);
    this.togglePossibleMoves = this.togglePossibleMoves.bind(this);
    this.toggleQuoteGenerator = this.toggleQuoteGenerator.bind(this);
    this.toggleGraveyards = this.toggleGraveyards.bind(this);
    this.toggleRotate = this.toggleRotate.bind(this);
    this.reset = this.reset.bind(this);
    this.createGraveyardElement = this.createGraveyardElement.bind(this);
  }

  componentDidMount() {
    this.syncQuoteGeneratorVisibility();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showQuoteGenerator !== this.state.showQuoteGenerator) {
      this.syncQuoteGeneratorVisibility();
    }
  }

  syncQuoteGeneratorVisibility() {
    const quoteRoot = document.getElementById('quote-generator-root');
    if (quoteRoot) {
      quoteRoot.style.display = this.state.showQuoteGenerator ? 'block' : 'none';
    }
  }

  findKingTile(boardState, pieceColor) {
    return BOARD_TILE_IDS.find((tileId) => {
      const piece = boardState[tileId].piece;
      return piece.color === pieceColor && piece.type === 'king';
    }) || 'none';
  }

  getPawnMoves(boardState, tileId, pieceColor) {
    return [
      ...pawnForwardMovement(boardState, tileId, pieceColor),
      ...pawnDiagonalMovement(boardState, tileId, pieceColor)
    ];
  }

  getKnightMoves(boardState, tileId, pieceColor) {
    return knightMovement(boardState, tileId, pieceColor);
  }

  getBishopMoves(boardState, tileId, pieceColor) {
    return diagonalMovement(boardState, tileId, pieceColor, MAX_DISTANCE);
  }

  getRookMoves(boardState, tileId, pieceColor) {
    return horizontalAndVerticalMovement(boardState, tileId, pieceColor, MAX_DISTANCE);
  }

  getQueenMoves(boardState, tileId, pieceColor) {
    return [
      ...horizontalAndVerticalMovement(boardState, tileId, pieceColor, MAX_DISTANCE),
      ...diagonalMovement(boardState, tileId, pieceColor, MAX_DISTANCE)
    ];
  }

  getKingMoves(boardState, tileId, pieceColor) {
    const castlingMoves = castle(boardState, tileId, pieceColor)[0];
    return [
      ...horizontalAndVerticalMovement(boardState, tileId, pieceColor, MIN_DISTANCE),
      ...diagonalMovement(boardState, tileId, pieceColor, MIN_DISTANCE),
      ...castlingMoves
    ];
  }

  getPseudoLegalMoves(boardState, tileId) {
    const piece = boardState[tileId].piece;
    if (piece.color === 'none') {
      return [];
    }

    switch (piece.type) {
      case 'pawn':
        return this.getPawnMoves(boardState, tileId, piece.color);
      case 'knight':
        return this.getKnightMoves(boardState, tileId, piece.color);
      case 'bishop':
        return this.getBishopMoves(boardState, tileId, piece.color);
      case 'rook':
        return this.getRookMoves(boardState, tileId, piece.color);
      case 'queen':
        return this.getQueenMoves(boardState, tileId, piece.color);
      case 'king':
        return this.getKingMoves(boardState, tileId, piece.color);
      default:
        return [];
    }
  }

  checkIfTileThreatened(boardState, tileId, pieceColor, oppPieceColor) {
    const threateningTiles = [];
    const fileCode = tileId[0].charCodeAt(0);
    const rank = parseInt(tileId[1], 10);
    const pawnSourceRank = pieceColor === 'white' ? rank + 1 : rank - 1;
    const pawnThreatTiles = [
      `${String.fromCharCode(fileCode - 1)}${pawnSourceRank}`,
      `${String.fromCharCode(fileCode + 1)}${pawnSourceRank}`
    ];

    pawnThreatTiles.forEach((candidateTile) => {
      const tile = boardState[candidateTile];
      if (tile && tile.piece.type === 'pawn' && tile.piece.color === oppPieceColor) {
        threateningTiles.push(candidateTile);
      }
    });

    this.getKnightMoves(boardState, tileId, pieceColor).forEach((candidateTile) => {
      if (boardState[candidateTile].piece.type === 'knight' && boardState[candidateTile].piece.color === oppPieceColor) {
        threateningTiles.push(candidateTile);
      }
    });

    this.getBishopMoves(boardState, tileId, pieceColor).forEach((candidateTile) => {
      const piece = boardState[candidateTile].piece;
      if ((piece.type === 'bishop' || piece.type === 'queen') && piece.color === oppPieceColor) {
        threateningTiles.push(candidateTile);
      }
    });

    this.getRookMoves(boardState, tileId, pieceColor).forEach((candidateTile) => {
      const piece = boardState[candidateTile].piece;
      if ((piece.type === 'rook' || piece.type === 'queen') && piece.color === oppPieceColor) {
        threateningTiles.push(candidateTile);
      }
    });

    const kingThreatTiles = [
      `${String.fromCharCode(fileCode - 1)}${rank}`,
      `${String.fromCharCode(fileCode - 1)}${rank + 1}`,
      `${String.fromCharCode(fileCode - 1)}${rank - 1}`,
      `${tileId[0]}${rank - 1}`,
      `${tileId[0]}${rank + 1}`,
      `${String.fromCharCode(fileCode + 1)}${rank}`,
      `${String.fromCharCode(fileCode + 1)}${rank + 1}`,
      `${String.fromCharCode(fileCode + 1)}${rank - 1}`
    ];

    kingThreatTiles.forEach((candidateTile) => {
      const tile = boardState[candidateTile];
      if (tile && tile.piece.type === 'king' && tile.piece.color === oppPieceColor) {
        threateningTiles.push(candidateTile);
      }
    });

    return threateningTiles;
  }

  getCastleRookMove(fromTileId, toTileId) {
    const fileDelta = toTileId[0].charCodeAt(0) - fromTileId[0].charCodeAt(0);
    if (Math.abs(fileDelta) !== 2) {
      return null;
    }

    const rank = fromTileId[1];
    if (fileDelta < 0) {
      return {
        from: `A${rank}`,
        to: `D${rank}`
      };
    }

    return {
      from: `H${rank}`,
      to: `F${rank}`
    };
  }

  getEnPassantCaptureTile(toTileId, pieceColor) {
    const rank = parseInt(toTileId[1], 10);
    const captureRank = pieceColor === 'white' ? rank - 1 : rank + 1;
    return `${toTileId[0]}${captureRank}`;
  }

  applyMoveToState(boardState, fromTileId, toTileId) {
    const nextState = cloneState(boardState);
    const movingPiece = pieces.clonePiece(nextState[fromTileId].piece);
    const destinationPiece = pieces.clonePiece(nextState[toTileId].piece);
    let capturedPiece = destinationPiece.color !== 'none' ? destinationPiece : null;

    const isEnPassantCapture = movingPiece.type === 'pawn'
      && toTileId === boardState.enPassant
      && destinationPiece.color === 'none';

    movingPiece.hasMoved = true;
    nextState[fromTileId].piece = pieces.createEmptyTile();
    nextState[toTileId].piece = movingPiece;
    nextState.enPassant = 'none';

    if (movingPiece.type === 'pawn') {
      const fromRank = parseInt(fromTileId[1], 10);
      const toRank = parseInt(toTileId[1], 10);
      if (Math.abs(toRank - fromRank) === 2) {
        nextState.enPassant = `${fromTileId[0]}${(fromRank + toRank) / 2}`;
      }
    }

    if (isEnPassantCapture) {
      const captureTileId = this.getEnPassantCaptureTile(toTileId, movingPiece.color);
      capturedPiece = pieces.clonePiece(nextState[captureTileId].piece);
      nextState[captureTileId].piece = pieces.createEmptyTile();
    }

    const rookMove = movingPiece.type === 'king' ? this.getCastleRookMove(fromTileId, toTileId) : null;
    if (rookMove) {
      const rookPiece = pieces.clonePiece(nextState[rookMove.from].piece);
      rookPiece.hasMoved = true;
      nextState[rookMove.from].piece = pieces.createEmptyTile();
      nextState[rookMove.to].piece = rookPiece;
    }

    if (capturedPiece && capturedPiece.color !== 'none') {
      const graveyardKey = `${capturedPiece.color}Graveyard`;
      nextState[graveyardKey] = [...nextState[graveyardKey], capturedPiece];
    }

    nextState.selectedTile = 'none';
    nextState.possibleMoves = [];

    return nextState;
  }

  isCastlePathSafe(boardState, fromTileId, toTileId, pieceColor) {
    const oppPieceColor = getOppositePieceColor(pieceColor);
    if (this.checkIfTileThreatened(boardState, fromTileId, pieceColor, oppPieceColor).length > 0) {
      return false;
    }

    const direction = toTileId[0].charCodeAt(0) > fromTileId[0].charCodeAt(0) ? 1 : -1;
    const throughTileId = `${String.fromCharCode(fromTileId[0].charCodeAt(0) + direction)}${fromTileId[1]}`;
    const throughState = cloneState(boardState);
    const kingPiece = pieces.clonePiece(throughState[fromTileId].piece);
    kingPiece.hasMoved = true;
    throughState[fromTileId].piece = pieces.createEmptyTile();
    throughState[throughTileId].piece = kingPiece;

    return this.checkIfTileThreatened(throughState, throughTileId, pieceColor, oppPieceColor).length < 1;
  }

  isMoveLegal(boardState, fromTileId, toTileId) {
    const movingPiece = boardState[fromTileId].piece;
    const pieceColor = movingPiece.color;
    const oppPieceColor = getOppositePieceColor(pieceColor);

    if (pieceColor === 'none') {
      return false;
    }

    if (movingPiece.type === 'king' && !this.isCastlePathSafe(boardState, fromTileId, toTileId, pieceColor)
      && Math.abs(toTileId[0].charCodeAt(0) - fromTileId[0].charCodeAt(0)) === 2) {
      return false;
    }

    const nextState = this.applyMoveToState(boardState, fromTileId, toTileId);
    const kingTile = movingPiece.type === 'king' ? toTileId : this.findKingTile(nextState, pieceColor);

    if (kingTile === 'none') {
      return false;
    }

    return this.checkIfTileThreatened(nextState, kingTile, pieceColor, oppPieceColor).length < 1;
  }

  getLegalMoves(tileId, boardState = this.state) {
    return this.getPseudoLegalMoves(boardState, tileId)
      .filter((candidateTile) => this.isMoveLegal(boardState, tileId, candidateTile));
  }

  hasAnyLegalMoves(boardState, pieceColor) {
    return BOARD_TILE_IDS.some((tileId) => {
      const piece = boardState[tileId].piece;
      return piece.color === pieceColor && this.getLegalMoves(tileId, boardState).length > 0;
    });
  }

  evaluateBoardState(boardState) {
    const currentPlayer = boardState.playerTurn;
    const kingTile = this.findKingTile(boardState, currentPlayer);
    const oppPieceColor = getOppositePieceColor(currentPlayer);
    const threateningTiles = kingTile === 'none'
      ? []
      : this.checkIfTileThreatened(boardState, kingTile, currentPlayer, oppPieceColor);
    const check = threateningTiles.length > 0;
    const hasLegalMoves = this.hasAnyLegalMoves(boardState, currentPlayer);
    const checkMate = check && !hasLegalMoves;
    const staleMate = !check && !hasLegalMoves;

    return {
      check,
      checkMate,
      staleMate,
      winner: checkMate ? oppPieceColor : 'none'
    };
  }

  handleTileClick(tileId) {
    if (this.state.checkMate || this.state.staleMate || this.state.pawnToConvert !== 'none') {
      return;
    }

    if (this.state.possibleMoves.includes(tileId)) {
      this.moveTo(tileId);
      return;
    }

    const selectedTile = this.state[tileId];
    if (selectedTile.piece.color === this.state.playerTurn) {
      this.setState({
        selectedTile: tileId,
        possibleMoves: this.getLegalMoves(tileId)
      });
      return;
    }

    this.setState({
      selectedTile: 'none',
      possibleMoves: []
    });
  }

  moveTo(tileId) {
    const previousTileId = this.state.selectedTile;
    const movingPiece = this.state[previousTileId].piece;
    const nextPlayerTurn = getOppositePieceColor(this.state.playerTurn);
    const nextState = this.applyMoveToState(this.state, previousTileId, tileId);

    nextState.playerTurn = nextPlayerTurn;
    nextState.pawnToConvert = movingPiece.type === 'pawn' && (tileId[1] === '1' || tileId[1] === '8')
      ? tileId
      : 'none';

    Object.assign(nextState, this.evaluateBoardState(nextState));
    this.setState(nextState);
  }

  convertPiece(pieceType) {
    const nextState = cloneState(this.state);
    const tileId = this.state.pawnToConvert;
    const pieceColor = tileId[1] === '8' ? 'white' : 'black';

    nextState[tileId].piece = pieces.createPiece(pieceType, pieceColor, true);
    nextState.pawnToConvert = 'none';
    Object.assign(nextState, this.evaluateBoardState(nextState));
    this.setState(nextState);
  }

  createGraveyardElement(piece, index) {
    const iconClass = `fas fa-chess-${piece.type} ${piece.color} graveyard-piece`;
    return (
      <div key={`${piece.color}-${piece.type}-${index}`}>
        <i className={iconClass}></i>
      </div>
    );
  }

  toggleTurnDisplay() {
    this.setState((prevState) => ({
      showTurnDisplay: !prevState.showTurnDisplay
    }));
  }

  togglePossibleMoves() {
    this.setState((prevState) => ({
      showPossibleMoves: !prevState.showPossibleMoves
    }));
  }

  toggleQuoteGenerator() {
    this.setState((prevState) => ({
      showQuoteGenerator: !prevState.showQuoteGenerator
    }));
  }

  toggleGraveyards() {
    this.setState((prevState) => ({
      showGraveyards: !prevState.showGraveyards
    }));
  }

  toggleRotate() {
    this.setState((prevState) => ({
      shouldRotate: !prevState.shouldRotate
    }));
  }

  reset() {
    this.setState(createDefaultState());
  }

  getTurnDisplayText() {
    if (this.state.checkMate) {
      return `${this.state.winner.toUpperCase()} WINS BY CHECKMATE`;
    }
    if (this.state.staleMate) {
      return 'STALEMATE';
    }
    if (this.state.check) {
      return `${this.state.playerTurn.toUpperCase()} PLAYER IN CHECK`;
    }
    return `${this.state.playerTurn.toUpperCase()} PLAYER'S TURN`;
  }

  renderBoardTiles() {
    return RANKS.flatMap((rank) => FILES.map((file) => {
      const tileId = `${file}${rank}`;
      return (
        <Tile
          key={tileId}
          tile={this.state[tileId]}
          isSelected={this.state.selectedTile === tileId}
          isPossibleMove={this.state.showPossibleMoves && this.state.possibleMoves.includes(tileId)}
          isRotated={this.state.shouldRotate}
          onTileClick={this.handleTileClick}
        />
      );
    }));
  }

  render() {
    const whiteGravePieces = this.state.whiteGraveyard.map(this.createGraveyardElement);
    const blackGravePieces = this.state.blackGraveyard.map(this.createGraveyardElement);
    const boardClassName = this.state.shouldRotate ? 'board board-rotated' : 'board';
    const pieceSelectorClassName = this.state.pawnToConvert !== 'none'
      ? 'piece-selector-box visible'
      : 'piece-selector-box';

    return (
      <div id="board-and-options-container">
        <div id="board-container">
          {this.state.showGraveyards ? (
            <div id="white-graveyard">
              <h2 className="graveyard-title">White Graveyard<i className="fas fa-scythe"></i></h2>
              <div className="graveyard-pieces">
                {whiteGravePieces}
              </div>
            </div>
          ) : null}
          <div id="board" className={boardClassName}>
            {this.renderBoardTiles()}
          </div>
          {this.state.showGraveyards ? (
            <div id="black-graveyard">
              <h2 className="graveyard-title">Black Graveyard</h2>
              <div className="graveyard-pieces">
                {blackGravePieces}
              </div>
            </div>
          ) : null}
        </div>
        {this.state.showTurnDisplay ? (
          <div id="player-turn-display">{this.getTurnDisplayText()}</div>
        ) : null}
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
            <input name="rotate-board" type="checkbox" checked={this.state.shouldRotate} onChange={this.toggleRotate}></input>
          </label>

          <button type="button" onClick={this.reset}>Reset</button>
        </form>
        <div id="piece-selector-box" className={pieceSelectorClassName}>
          <h3 id="piece-selector-title">Select a new piece</h3>
          <div id="piece-selector">
            <div className="piece-option" onClick={() => this.convertPiece('knight')}><i className="fas fa-chess-knight"></i></div>
            <div className="piece-option" onClick={() => this.convertPiece('bishop')}><i className="fas fa-chess-bishop"></i></div>
            <div className="piece-option" onClick={() => this.convertPiece('rook')}><i className="fas fa-chess-rook"></i></div>
            <div className="piece-option" onClick={() => this.convertPiece('queen')}><i className="fas fa-chess-queen"></i></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
