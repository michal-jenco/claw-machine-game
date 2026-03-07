# ✨ Kawaii Plushie Claw Machine Simulator :3 ✨

A fully client-side browser game where you control an arcade claw machine to catch adorable hand-crafted SVG plushies. Built with vanilla HTML, CSS, JavaScript — no frameworks, no build tools.

> **Live:** Open `index.html` in any modern browser (or serve via `python -m http.server`).

---

## Table of Contents

- [How to Play](#how-to-play)
- [Controls](#controls)
- [Game Mechanics](#game-mechanics)
- [Plushie Characters](#plushie-characters)
- [Plushie Personalities](#plushie-personalities)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [File Structure](#file-structure)
- [Configuration](#configuration)
- [Data Persistence](#data-persistence)
- [External Dependencies](#external-dependencies)
- [Future Plans](#future-plans)

---

## How to Play

1. Open `index.html` in your browser (or serve at `http://localhost:8000`)
2. Use arrow keys (or mobile D-pad) to move the claw around the glass chamber
3. Press **Space** / **Enter** (or tap **GRAB!** on mobile) to drop the claw
4. Catch plushies, rack up points and tickets, chase shinies!
5. When tokens run out (or you catch everything), the game ends with a report card

---

## Controls

### Desktop (Keyboard)

| Key | Action |
|-----|--------|
| `←` `→` `↑` `↓` Arrow Keys | Move claw |
| `Space` / `Enter` | Drop claw & grab |
| `Escape` | Close any open modal/overlay |

### Mobile (Touch)

A **D-pad** and **GRAB!** button appear automatically on touch devices (screen width ≤ 768px with coarse pointer). The D-pad supports hold-to-repeat movement (~50ms interval after 200ms initial delay).

---

## Game Mechanics

### Tokens

- You start each game with **5 tokens**
- Each grab costs **1 token**
- When all tokens are spent, the game ends
- **Leftover tokens** award a massive **cubic bonus** at game end: `score × tokens³`
  - 1 token left → ×1, 2 left → ×8, 3 left → ×27, 4 left → ×64, 5 left → ×125
- Multi-catches award **+1 bonus token** (capped at 5 max)

### Scoring

| Event | Points |
|-------|--------|
| Catch a plushie | 14–25 pts (varies by character) |
| ✨ Shiny catch | Current score × 10 (exponential!) |
| Multi-catch (2+) | `100 × count²` bonus pts |
| 🎊 Perfect game (all 12 caught) | `500 + score² / 100` bonus pts |
| 🎰 Token bonus (end of game) | `score × tokensLeft³` |

### Tickets

- Earned at a rate of **1 ticket per 5 points** at every scoring stage
- Tickets compound with the same exponential growth as scores
- Currently a vanity stat displayed in HUD, splash screen, stats, and exports
- **Planned**: Ticket Shop for cosmetic purchases (see [Future Plans](#future-plans))

### Shiny Plushies ✨

- Each game, **one random plushie** out of the 12 spawned is marked **shiny**
- Shiny plushies have a pulsing aura, glowing ring, and twinkling sparkles in the machine
- Catching a shiny awards **×10 the current accumulated score** as bonus
- Shiny catches are tracked in the Plushiedex separately from normal variants

### Multi-Catch Bonus

Grabbing 2+ plushies in a single claw drop awards:
- **Quadratic score bonus**: `100 × count²` points
- **+1 bonus token** (if below cap of 5)
- Labels: Double Catch (2), Triple Catch (3), Quad Catch (4), Mega Catch (5+)

### Perfect Game 🎊

- Catch **all 12 plushies** in the machine
- Awards a massive **quadratic bonus**: `500 + score² / 100`
- The game ends immediately after a perfect game

---

## Plushie Characters

10 unique SVG plushie character designs, each hand-crafted with radial gradients, shadows, and kawaii features:

| # | Name | Emoji | Points | Primary Color | Design |
|---|------|-------|--------|---------------|--------|
| 1 | **Miku** | 🎵 | 20 | Cyan `#00E5FF` | Twintails, blue dress, green eyes, pink bow |
| 2 | **Teto** | 🎶 | 20 | Red `#FF6B9D` | Red/pink hair with blonde tips, golden eyes |
| 3 | **My Melody** | 🐰 | 15 | Pink `#FFB6E1` | Pink bunny with cute ears, white face, pink bow |
| 4 | **Kuromi** | 🖤 | 25 | White/Black | White plushie with devil horns, scowl, black marks |
| 5 | **Hello Kitty** | 💕 | 15 | White/Pink | White cat with pink bow, triangle nose |
| 6 | **Chibi Angel** | ✨ | 18 | Pastel pink `#FFE4FF` | Halo, wings, stars, glowing aura |
| 7 | **Sakura Chibi** | 🌸 | 18 | Pink `#FFB6E1` | Shy expression, flower, big blush |
| 8 | **Purple Plushie** | 💜 | 16 | Purple `#E6B3FF` | Round, happy expression |
| 9 | **Ribbon Cutie** | 🎀 | 14 | White/Pink | Flowing ribbons and central bow |
| 10 | **Star Plushie** | ⭐ | 17 | Gold `#FFD700` | Star-shaped with cute face and sparkles |

Each game randomly spawns **12 plushies** (with replacement from the 10 types) inside the glass chamber with collision-free placement.

---

## Plushie Personalities

Each plushie type has a unique personality blurb shown in the detail overlay:

| Plushie | Personality |
|---------|-------------|
| **Miku** | _"Miku is a diva <3 She is always positive, likes to cheer others up, a little bit air-headed but boi can she sing. SEEKAAA~~~~ (forgets lyrics) XD"_ |
| **Teto** | _"She is a more mischievous vocaloid than Miku. She always fights for recognition, loves to eat baguettes 🥖 and you can in general trust her. She is a little bit tsundere so be careful when you encounter Teto >_<"_ |
| Others | Personality pending!! >_< |

---

## Features

### 🎮 Core Gameplay
- **SVG Claw Machine**: Entire machine rendered as an interactive SVG schematic with neon cyberpunk aesthetic (dark purple background, cyan/pink/green strokes, grid pattern)
- **Animated Claw**: Three-pronged claw with motor housing, pivot bolts, cable connector, grab glow ring. Opens/closes with rotation transforms and mechanical wobble animation
- **Prize Spawning**: Non-overlapping random placement within the glass chamber (up to 60 attempts per prize)
- **Collision Detection**: Circle-based distance check between claw center and prize positions

### 🔊 Sound System
- Synthesized audio via **Web Audio API** — no audio files needed
- 10 distinct sound effects, each built from layered oscillators (sine, triangle, square, sawtooth):
  - `move` — subtle click on claw movement (throttled at 70ms)
  - `grab` — mechanical clamp sound
  - `catch` — rising chime
  - `shiny` — triple ascending sparkle
  - `bonus` — multi-catch fanfare
  - `perfect` — triumphant chord progression
  - `gameOver` — descending tone
  - `plushiedexNew` — four-note discovery jingle
  - `plushiedexComplete` — seven-note celebration
- Sound toggle with persistent preference (stored in `localStorage`)
- Audio context resumes on first user interaction (autoplay policy compliance)

### 📊 Stats Modal
- **Lifetime stats**: Games played, lifetime score, best score, lifetime tickets, total plushies caught, total shinies, perfect games
- **Game history table**: Sortable by date, score, tickets, caught count, tokens left (click column headers to sort)
- **Per-game report card export**: 📸 button on each history row generates a PNG
- **Bulk export**: PDF export of full stats + history (multi-page, styled), JSON export (saves file + copies to clipboard)
- **Import**: Load a previously exported JSON to restore history (with validation and confirmation)
- **Clear history**: Wipes all data with confirmation prompt
- Capped at **500 game records** max

### 🧸 My Collection Modal
- Aggregates **all plushies ever caught** across all games
- Groups by plushie type + shiny status with catch counts
- Sorted: shinies first, then by count descending, then alphabetically
- Click any plushie to open the **detail overlay**
- Export as PNG or PDF

### 📖 Plushiedex
- "Gotta SQUISH them all!!" — Pokédex-style collection tracker
- Dual progress bars: **Types** found vs total, **Shiny** variants found vs total
- Roster grid showing all 10 types with ✓ and ✨ badges for discovered entries
- Missing section lists uncaught types and shiny variants
- **Completion bonus**: Catch every type AND every shiny variant to earn **10,000,000,000 lifetime tickets** (awarded once ever)
- New discoveries trigger a **toast notification** + `plushiedexNew` sound during gameplay
- Full completion triggers a 7-second celebration toast + `plushiedexComplete` sound
- Export as PNG or PDF

### 🔍 Plushie Detail Overlay
- Large 220px SVG render of the plushie
- Spotlight glow effect (gold for shiny, pink for normal)
- Badges: type emoji + points, shiny status, shiny point multiplier
- Personality text
- Stats: times caught, first/last catch dates
- **Export as PNG**: Custom canvas-rendered card with rounded corners, gradient background, badges, personality, stats, and watermark

### 🎉 Game Over Splash Screen
- Animated plushie collection grid with staggered entrance animations
- Perfect game badge, token bonus breakdown (tokens left × cubic multiplier)
- New Plushiedex entries highlighted with 📖 NEW badge
- Plushiedex completion badge (if just completed)
- Floating kaomoji decorations randomly positioned around the card
- Export as PNG report card

### 📸 Export System
Multiple export formats across the game:

| Export | Format | Source |
|--------|--------|--------|
| Game report card | PNG | Splash screen / history row |
| Stats | PDF (multi-page, styled) | Stats modal |
| Stats | JSON (file + clipboard) | Stats modal |
| Collection | PNG or PDF | Collection modal |
| Plushiedex | PNG or PDF | Plushiedex modal |
| Plushie detail | PNG (canvas-rendered) | Detail overlay |

PNG exports use **html2canvas** for DOM capture. PDF exports use **jsPDF** with manual page slicing. The plushie detail export is fully canvas-rendered (SVG → Image → Canvas) for maximum quality.

### ❓ Tutorial System
- Auto-shows on first visit (tracked via `localStorage`)
- Covers: controls, tokens, scoring, bonuses, stats
- Can be reopened anytime via the ❓ HOW TO PLAY button
- Dismissible via button, close button, Escape key, or overlay click

### 🎨 Visual Design
- **Cyberpunk-kawaii aesthetic**: Dark purple/black backgrounds with neon pink, cyan, and green accents
- **SVG schematic machine**: Grid pattern overlay, neon glow gradients, motor details, cable dashes
- **Floating kaomoji**: 10–15 randomly scattered animated kaomojis in the caught section, each with unique drift, rotation, pulse, and opacity (all CSS custom properties randomized per instance)
- **32 unique kaomoji** in the rotation pool
- **Responsive layout**: Three breakpoints (1060px, 768px, 480px) adapting the machine + sidebar layout
- **Animations**: Bounce on catch, shiny pop, bonus cards, plushiedex toasts, splash entrance stagger

---

## Technical Architecture

### File Structure

```
claw-machine-game/
├── index.html                 # Game layout, SVG claw machine, all modal overlays, hidden report card template
├── styles.css                 # Full styling (~3300+ lines): machine, modals, animations, shiny effects, responsive, touch controls
├── plushie-factory.js         # PlushieFactory class — static SVG generators for all 10 plushie types + emoji→type mapper
├── script.js                  # Game engine (~3100 lines): state management, mechanics, sound, modals, exports, controls
├── plan-ticketShop.prompt.md  # Design document for planned Ticket Shop feature
└── readme.md                  # This file
```

### Key Modules in `script.js`

| Module | Description |
|--------|-------------|
| **`gameState`** | Central mutable state object: score, tokens, claw position, prizes, caught list, audio context, etc. |
| **`CONFIG`** | All tuning constants: glass box geometry, claw speed/radius, prize count/size, bonus amounts, point values |
| **`GameHistory`** | localStorage CRUD for game records: `save()`, `getAll()`, `getLifetimeStats()`, `clear()`, plushiedex bonus tracking |
| **Sound system** | `ensureAudioContext()`, `playTone()`, `playSound(effect)` — Web Audio API synthesis |
| **Claw mechanics** | `moveClaw()`, `updateClawPosition()`, `grabPrize()`, `moveClawDown/Up()`, `closeClaw/openClaw()` — SVG attribute manipulation |
| **Collision** | `checkPrizeCollision()` — circle distance check with `CLAW_RADIUS + PRIZE_RADIUS × 0.9` |
| **Prize spawning** | `generatePrizes()`, `findSpawnPosition()` — random placement with overlap rejection |
| **Plushiedex** | Snapshot-based new-discovery detection, toast notifications, completion tracking |
| **Modals** | Stats, Collection, Plushiedex, Plushie Detail, Tutorial — each with open/close/render/export functions |
| **Export** | `captureModalCard()` → html2canvas, `canvasToPDF()` → jsPDF, `exportPlushieAsPNG()` → manual canvas rendering |

### `PlushieFactory` (plushie-factory.js)

Static class with:
- `createPlushieSVG(type, size)` — returns an SVG string for the given plushie type at the specified pixel size
- 10 type-specific methods: `createMikuPlushie()`, `createTetoPlushie()`, etc.
- `getPrizeType(emoji)` — maps emoji characters to internal type strings (e.g., `'🎵'` → `'miku'`)
- Each plushie uses unique **radial gradients** (IDs scoped by size to avoid SVG conflicts), custom proportions, and kawaii features

### SVG Claw Machine

The entire machine is a `<svg viewBox="0 0 700 700">` with:
- Dark background with grid pattern overlay
- Glass chamber: green-stroked rectangle with section lines
- Claw mechanism: motor ring + dot (top), dashed cable, motor housing, base plate with pivot bolts, three prongs (left/right/center) with tip details
- Grab glow ring (dashed circle, shown on grab)
- All claw movement done via `setAttribute('transform', ...)` for hardware-accelerated positioning
- Prizes rendered as `<g>` groups inside `#prizes-svg-container` with `PlushieFactory` SVG content

---

## Configuration

Key constants in `CONFIG` (script.js):

| Constant | Value | Description |
|----------|-------|-------------|
| `MAX_TOKENS` | 5 | Starting tokens per game |
| `PRIZE_COUNT` | 12 | Plushies spawned per game |
| `CLAW_SPEED` | 8 | Pixels per movement step |
| `CLAW_RADIUS` | 40 | Grab detection radius |
| `PRIZE_SIZE` | 82 | SVG plushie render size in machine |
| `PRIZE_RADIUS` | 41 | Collision radius for prizes |
| `MULTI_CATCH_BASE_BONUS` | 100 | Base points for multi-catch (×count²) |
| `PERFECT_GAME_BONUS` | 500 | Flat perfect game bonus |
| `PLUSHIEDEX_COMPLETION_BONUS_TICKETS` | 10,000,000,000 | One-time Plushiedex completion reward |
| `PRIZE_SPAWN_ATTEMPTS` | 60 | Max attempts to place a prize without overlap |
| `BONUS_DISPLAY_MS` | 2000 | Duration of bonus message display |
| `SHINY_TO_BONUS_DELAY_MS` | 2000 | Delay between shiny catch and subsequent bonus display |
| `CLAW_CATCH_OFFSET_Y` | 41 | Y offset from clawY to geometric center of claw assembly |

---

## Data Persistence

All data is stored in **`localStorage`** (no server, no cookies):

| Key | Type | Description |
|-----|------|-------------|
| `kawaiiClawGameHistory` | JSON array | Up to 500 game records (date, score, tickets, plushies, shiny count, perfect flag, token bonus, prize details, plushiedex flags) |
| `kawaiiClawPlushiedexCompletionBonus` | Number string | One-time completion bonus amount (prevents re-awarding) |
| `kawaiiClawSoundEnabled` | `'true'`/`'false'` | Sound preference |
| `kawaiiClawTutorialSeen` | `'1'` | Tutorial dismissed flag |

---

## External Dependencies

Loaded via CDN in `index.html`:

| Library | Version | Purpose |
|---------|---------|---------|
| [html2canvas](https://html2canvas.hertzen.com/) | 1.4.1 | DOM-to-canvas capture for PNG exports |
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | PDF generation for stats/collection/plushiedex exports |

No other dependencies. No build step. No npm. Pure browser.

---

## Future Plans

### 🛒 Ticket Shop (Planned)

A detailed design document exists in `plan-ticketShop.prompt.md`. Key points:

- **Purpose**: Give tickets (currently vanity-only) a spending mechanic
- **Economy**: Tiered pricing (500K → 5B tickets) scaled to the exponential score curve
- **Tiers**: 🟢 Common, 🔵 Uncommon, 🟣 Rare, 🟡 Epic, 🔴 Legendary, 💎 Mythic
- **Categories**:
  - 🎩 **Plushie Accessories** — SVG overlays: bows, hats, crowns, wings, auras (13 items)
  - 🎨 **Machine Themes & Claw Skins** — CSS color scheme swaps (7 themes + 4 claw skins)
  - 🪙 **Extra Starting Tokens** — consumable per-game, +1 (15M) or +2 (35M)
  - 🏅 **Titles & Badges** — displayed on report cards, some milestone-gated (7 titles)
  - 🌟 **Golden Plushie Variants** — gilded cosmetic overlay (750M each or 5B bundle)
- **Implementation**: New `shop.js` module, shop overlay modal, `PlushieFactory` options parameter for accessories/gilding, CSS custom properties for themes, wallet system (`lifetimeTickets - lifetimeTicketsSpent`)
- **Files to create/modify**: `shop.js` (new), `index.html`, `script.js`, `plushie-factory.js`, `styles.css`

---

## Original SVG Plushie Conversion Notes

The game originally used emoji characters for prizes. The SVG conversion added:

- **`plushie-factory.js`**: Complete SVG plushie generation library with 10 unique designs
- **`script.js` updates**: `generatePrizes()` renders SVG plushies via `PlushieFactory`, `addCaughtPrize()` displays them in caught container, collision detection adapted for SVG dimensions
- **`index.html` updates**: Added `plushie-factory.js` script reference
- **`styles.css` updates**: SVG display in caught-prize containers, bounce animations, scaling

---

_Keep being kawaii! (◕‿◕✿)_
