# Cap Stack Sort — playable core

A dependency-free Canvas bottle-cap puzzle. Open `index.html`, or play on GitHub Pages.

## Baseline
Restores the animation, audio, input and accessibility systems from `130071c`, with current rules replacing the original whole-stack clear. Later layout regressions are not the design baseline.

## Rules and controls
- 5×6 board, three next stacks. Drag with mouse or touch; tap a stack then an empty cell also works.
- Orthogonally adjacent matching top groups move into the active stack.
- **10 is a threshold, not a removal limit.** 13 matching top caps clear all 13. Buried colors survive, then merge and clear again when possible.
- 10 points per removed cap; consecutive clears in one move add 25% per chain step (×1, ×1.25, ×1.5…).
- Game over is evaluated only after all reactions finish.
- The opening uses four colors, larger stacks and board-aware assistance. After three active minutes, assistance fades over seven minutes; more colors and layered stacks increase difficulty. Session length still needs player balancing.
- Keyboard: 1–3 select, arrows aim, Enter place; H help, M sound, R restart.

## Presentation
Warm wooden table, pale physical board, dark tray, original fictional drink labels, crimped metal cap tops and visible colored rims. Count badge shows the matching top group. Preserved flight, landing bounce, charge/clear, particles, rings, impact, score bump and procedural audio. Timer pauses in background/help and starts with the first move. Personal best is saved locally.

## Verification
- `node tests/rules.cjs` runs threshold/layer/chain tests and 200 deterministic conservation fixtures.
- Browser regression: install Playwright, serve the root on port 8765, then run `node tests/regression.cjs`. Tests mouse drag, tap, Chromium touch input, combo scoring and sound triggers. Screenshots are generated in the temporary directory.
- GitHub Actions runs both suites and saves desktop/mobile screenshots.

No build step, remote fonts, paid services or game assets are required. Browser test tooling is development-only. Target session duration and real-device touch feel need playtesting.
