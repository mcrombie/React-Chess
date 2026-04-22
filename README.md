# React Chess

This repository is an older React chess project that started as a learning exercise. The codebase is still intentionally recognizable as the original app, but this branch is now the **patch-up version**: a conservative repair pass meant to keep the legacy structure while fixing the worst gameplay and stability problems.

The long-term comparison plan is:

1. `legacy-baseline`: the closest runnable version of the original app.
2. `patch-up`: this branch, where the legacy architecture is preserved but the most disruptive bugs are fixed.
3. `rebuild-ts`: a future full rebuild in TypeScript with a cleaner architecture.

## What This Patch-Up Version Changed

### Tooling And Repo Health

- Replaced the old `node-sass` dependency with `sass` so the project installs and runs on a modern Node/Python setup.
- Removed unused `redux` and `react-redux` dependencies.
- Replaced the stale `App.test.js` smoke test that referenced a missing `App` component with a working board render test.

### Piece Identity And Board State Safety

- Removed the shared singleton-piece problem.
  Every square now gets its own piece object instead of reusing a single `whitePawn`, `blackRook`, and so on.
- Reset now creates a fresh game state instead of reusing mutated piece objects from earlier games.
- Move application now clones board state before applying piece movement, captures, castling, and graveyard updates.

### Chess Rule Fixes

- Added a legal-move filter that simulates moves and rejects any move that leaves the moving side's king in check.
- Fixed check/checkmate evaluation so it no longer runs inside `render()`.
- Removed the old behavior where `checkMate()` immediately reset the board and erased the result.
- Added stable checkmate and stalemate detection for the side to move.
- Fixed castling so it:
  - checks `piece.hasMoved` correctly on rooks
  - moves the rook to the correct square
  - rejects castles through check or out of check
- Kept en passant support as part of pawn move generation and move application instead of leaving it half-implemented.
- Promotion still uses the legacy piece picker, but the board now pauses while promotion is pending so the game state cannot drift underneath it.

### React/UI Safety Improvements

- Removed render-time rule evaluation that could trigger state updates during rendering.
- Moved board highlighting to React-driven class names instead of directly mutating tile styles during gameplay.
- Moved board rotation to CSS classes instead of imperative DOM transforms.
- Turn display and graveyard visibility are now handled by React rendering instead of manual element style mutation.
- Added interval cleanup to the quote generator so it does not leave timers behind on unmount.

## What I Intentionally Did Not Change

This is still a patch-up, not a rebuild.

- The app is still plain JavaScript, not TypeScript.
- The board is still centered in a single large legacy component instead of being split into a modern engine + UI architecture.
- The quote generator still exists as a separate concern from the chess board.
- The UI is still visually close to the original project.

Those larger changes are being saved for the future rebuild branch so the blog post can compare:

- original code
- repaired legacy code
- fully redesigned TypeScript code

## Running The App

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run the test suite:

```bash
npm test -- --watchAll=false --runInBand
```

## Verification For This Patch-Up Pass

The current patch-up version was verified with:

```bash
npm test -- --watchAll=false --runInBand
npm run build
```

Both commands completed successfully on April 22, 2026.
