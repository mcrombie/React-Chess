# What To Fix First

## Priority 1: Correctness Bugs

- Replace shared piece singletons with fresh per-square piece objects.
  Why:
  `hasMoved` is mutated during play, and shared references can corrupt rules like castling and pawn first moves.

- Fix the checkmate condition to use array length correctly.
  Why:
  The current `calculateKingMoves(...) < 1` logic is almost certainly wrong.

- Remove the immediate board reset from `checkMate()`.
  Why:
  The current code appears to erase the very state it is trying to represent.

- Audit castling checks so they read `piece.hasMoved` consistently.
  Why:
  Current checks appear inconsistent and likely incorrect.

- Finish or remove incomplete en passant logic.
  Why:
  Partial special-move support is worse than clearly unsupported behavior.

## Priority 2: React Safety

- Stop calling `lookForCheck()` inside `render()`.
  Why:
  Rules evaluation that can trigger state updates should not run during rendering.

- Remove direct style mutation from gameplay flow.
  Why:
  `document.getElementById(...)` and manual `style = ...` updates make behavior harder to reason about and easier to break.

- Move board highlighting and rotation into React-driven state and class names.
  Why:
  This will make rendering predictable and reduce UI bugs.

## Priority 3: State Structure

- Replace 64 top-level state keys with a dedicated `board` structure.
  Why:
  A normalized board model is much easier to inspect, update, test, and pass between functions.

- Separate game state from UI state.
  Why:
  `playerTurn`, `enPassant`, and board contents should not live at the same level as quote visibility and graveyard display toggles.

- Stop mutating arrays in place before `setState()`.
  Why:
  React state updates are safer and more predictable with immutable updates.

## Priority 4: Chess Rule Legality

- Ensure every move is filtered by legality, not just raw movement shape.
  Why:
  A piece should not be allowed to move if that move leaves its own king in check.

- Add a clean rule pipeline:
  1. generate pseudo-legal moves
  2. simulate move
  3. reject moves that leave own king in check

- Rework check, checkmate, and blocking logic using pure helper functions.
  Why:
  The current implementation is hard to trust and hard to debug.

## Priority 5: Repo Health

- Fix or remove the stale `App.test.js`.
  Why:
  The current test file references a component that does not exist.

- Remove unused dependencies like `redux` and `react-redux` if they are not needed.
  Why:
  This reduces confusion and maintenance overhead.

- Update the README with chess-specific documentation.
  Why:
  The current README is mostly stock CRA text and does not explain the actual project.

## Suggested Order Of Work

1. Fix shared piece object bugs.
2. Move check/checkmate evaluation out of `render()`.
3. Repair special-rule correctness: castling, en passant, promotion, checkmate.
4. Normalize the board state shape.
5. Replace DOM manipulation with React state/class-driven rendering.
6. Add tests around pure move logic.
7. Split `board.js` into smaller components and helper modules.

## If You Only Do Three Things First

- Fix shared piece references.
- Stop doing rule checks inside `render()`.
- Add a pure legality check that prevents moves exposing your own king.
