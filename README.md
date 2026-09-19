# Cap Stack Sort — v0.3.1

Single-file playable prototype.

## Core rules
- 5×6 board, three stacks per tray.
- Place only into an empty cell.
- Matching top colors from orthogonal neighbors merge into the active stack.
- A top run of **10 or more** clears the **entire matching run**: 13 clears 13, 15 clears 15.
- Buried colors stay and can immediately trigger a new merge after being exposed.
- Base score is 10 points per cleared cap, with a small escalating combo bonus.
- First three minutes are intentionally easy and combo-rich: fewer colors, larger stacks, and smart random favoring useful caps.
- Full board after all reactions finish = game over.

## Visual direction
Warm tabletop, molded board, physical bottle caps with crimped rims, and diagonally offset stacks so lower colors remain visible.

No build step or external assets are required. Open `index.html`.
