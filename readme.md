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

<table>
<tr>
<td align="center" width="20%">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="miku-hair-grad-miku" cx="40%" cy="30%"><stop offset="0%" style="stop-color:#00E5FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#00ACC1;stop-opacity:1" /></radialGradient><radialGradient id="miku-face-grad-miku" cx="50%" cy="40%"><stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" /></radialGradient></defs><ellipse cx="15" cy="20" rx="12" ry="25" fill="url(#miku-hair-grad-miku)"/><ellipse cx="85" cy="20" rx="12" ry="25" fill="url(#miku-hair-grad-miku)"/><ellipse cx="50" cy="15" rx="30" ry="20" fill="url(#miku-hair-grad-miku)"/><rect x="8" y="8" width="8" height="8" fill="#FF1493" rx="2"/><rect x="84" y="8" width="8" height="8" fill="#FF1493" rx="2"/><circle cx="50" cy="45" r="25" fill="url(#miku-face-grad-miku)"/><ellipse cx="35" cy="40" rx="8" ry="12" fill="#00CC99"/><ellipse cx="65" cy="40" rx="8" ry="12" fill="#00CC99"/><circle cx="35" cy="38" r="4" fill="#000"/><circle cx="65" cy="38" r="4" fill="#000"/><circle cx="37" cy="36" r="1.5" fill="#FFF"/><circle cx="67" cy="36" r="1.5" fill="#FFF"/><path d="M 40 55 Q 50 62 60 55" stroke="#FF1493" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="75" rx="22" ry="28" fill="#00E5FF"/><path d="M 28 65 L 25 95 L 75 95 L 72 65" fill="#1a1a2e" opacity="0.8"/><circle cx="50" cy="68" r="8" fill="#FF1493" opacity="0.6"/><ellipse cx="12" cy="70" rx="8" ry="15" fill="#FFFACD"/><ellipse cx="88" cy="70" rx="8" ry="15" fill="#FFFACD"/><circle cx="8" cy="88" r="6" fill="#FFFACD"/><circle cx="92" cy="88" r="6" fill="#FFFACD"/><ellipse cx="35" cy="95" rx="8" ry="12" fill="#00E5FF"/><ellipse cx="65" cy="95" rx="8" ry="12" fill="#00E5FF"/><circle cx="22" cy="48" r="5" fill="#FFB6E1" opacity="0.6"/><circle cx="78" cy="48" r="5" fill="#FFB6E1" opacity="0.6"/></svg>
<br><strong>🎵 Miku</strong><br>20 pts · Cyan
</td>
<td align="center" width="20%">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="teto-hair-grad-teto"><stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" /><stop offset="100%" style="stop-color:#C92A2A;stop-opacity:1" /></radialGradient><radialGradient id="teto-face-grad-teto"><stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" /></radialGradient></defs><ellipse cx="15" cy="20" rx="10" ry="23" fill="url(#teto-hair-grad-teto)"/><ellipse cx="85" cy="20" rx="10" ry="23" fill="url(#teto-hair-grad-teto)"/><ellipse cx="50" cy="15" rx="28" ry="18" fill="url(#teto-hair-grad-teto)"/><polygon points="15,43 10,50 20,48" fill="#FFD700"/><polygon points="85,43 90,50 80,48" fill="#FFD700"/><circle cx="50" cy="45" r="24" fill="url(#teto-face-grad-teto)"/><ellipse cx="35" cy="40" rx="7" ry="10" fill="#FFD700"/><ellipse cx="65" cy="40" rx="7" ry="10" fill="#FFD700"/><circle cx="35" cy="39" r="3.5" fill="#000"/><circle cx="65" cy="39" r="3.5" fill="#000"/><path d="M 38 54 Q 50 60 62 54" stroke="#C92A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="75" rx="20" ry="26" fill="#FF6B9D"/><ellipse cx="12" cy="70" rx="7" ry="14" fill="#FFFACD"/><ellipse cx="88" cy="70" rx="7" ry="14" fill="#FFFACD"/><ellipse cx="35" cy="94" rx="7" ry="10" fill="#FFD700"/><ellipse cx="65" cy="94" rx="7" ry="10" fill="#FFD700"/><circle cx="22" cy="48" r="4.5" fill="#FFB6E1" opacity="0.7"/><circle cx="78" cy="48" r="4.5" fill="#FFB6E1" opacity="0.7"/></svg>
<br><strong>🎶 Teto</strong><br>20 pts · Red
</td>
<td align="center" width="20%">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="melody-grad-melody"><stop offset="0%" style="stop-color:#FFB6E1;stop-opacity:1" /><stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" /></radialGradient></defs><ellipse cx="50" cy="60" rx="25" ry="30" fill="url(#melody-grad-melody)"/><ellipse cx="25" cy="20" rx="10" ry="18" fill="url(#melody-grad-melody)"/><ellipse cx="75" cy="20" rx="10" ry="18" fill="url(#melody-grad-melody)"/><ellipse cx="25" cy="25" rx="5" ry="10" fill="#FFF"/><ellipse cx="75" cy="25" rx="5" ry="10" fill="#FFF"/><circle cx="50" cy="35" r="20" fill="url(#melody-grad-melody)"/><circle cx="38" cy="30" r="6" fill="#000"/><circle cx="62" cy="30" r="6" fill="#000"/><circle cx="40" cy="28" r="2" fill="#FFF"/><circle cx="64" cy="28" r="2" fill="#FFF"/><ellipse cx="50" cy="10" rx="12" ry="8" fill="#FF1493"/><circle cx="40" cy="8" r="5" fill="#FF1493"/><circle cx="60" cy="8" r="5" fill="#FF1493"/><path d="M 42 42 Q 50 48 58 42" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="25" cy="38" r="5" fill="#FFF" opacity="0.7"/><circle cx="75" cy="38" r="5" fill="#FFF" opacity="0.7"/><ellipse cx="35" cy="92" rx="8" ry="12" fill="url(#melody-grad-melody)"/><ellipse cx="65" cy="92" rx="8" ry="12" fill="url(#melody-grad-melody)"/></svg>
<br><strong>🐰 My Melody</strong><br>15 pts · Pink
</td>
<td align="center" width="20%">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="kuromi-grad-kuromi"><stop offset="0%" style="stop-color:#FFF;stop-opacity:1" /><stop offset="100%" style="stop-color:#F0F0F0;stop-opacity:1" /></radialGradient></defs><ellipse cx="50" cy="65" rx="24" ry="28" fill="url(#kuromi-grad-kuromi)"/><ellipse cx="20" cy="15" rx="12" ry="20" fill="url(#kuromi-grad-kuromi)"/><ellipse cx="80" cy="15" rx="12" ry="20" fill="url(#kuromi-grad-kuromi)"/><polygon points="15,5 12,2 18,10" fill="#C0C0C0"/><polygon points="85,5 88,2 82,10" fill="#C0C0C0"/><circle cx="50" cy="35" r="22" fill="url(#kuromi-grad-kuromi)"/><ellipse cx="35" cy="30" rx="6" ry="8" fill="#000"/><ellipse cx="65" cy="30" rx="6" ry="8" fill="#000"/><circle cx="37" cy="28" r="2" fill="#FFF"/><circle cx="67" cy="28" r="2" fill="#FFF"/><path d="M 40 45 Q 50 48 60 45" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="18" rx="6" ry="8" fill="#000"/><ellipse cx="80" cy="18" rx="6" ry="8" fill="#000"/><ellipse cx="32" cy="95" rx="8" ry="10" fill="url(#kuromi-grad-kuromi)"/><ellipse cx="68" cy="95" rx="8" ry="10" fill="url(#kuromi-grad-kuromi)"/></svg>
<br><strong>🖤 Kuromi</strong><br>25 pts · White/Black
</td>
<td align="center" width="20%">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="kitty-grad-kitty"><stop offset="0%" style="stop-color:#FFF;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFE4E1;stop-opacity:1" /></radialGradient></defs><ellipse cx="50" cy="65" rx="22" ry="27" fill="url(#kitty-grad-kitty)"/><polygon points="28,18 22,2 35,15" fill="url(#kitty-grad-kitty)"/><polygon points="72,18 78,2 65,15" fill="url(#kitty-grad-kitty)"/><polygon points="28,18 25,8 32,14" fill="#FFB6E1"/><polygon points="72,18 75,8 68,14" fill="#FFB6E1"/><circle cx="50" cy="35" r="21" fill="url(#kitty-grad-kitty)"/><circle cx="38" cy="31" r="5" fill="#000"/><circle cx="62" cy="31" r="5" fill="#000"/><circle cx="40" cy="29" r="1.5" fill="#FFF"/><circle cx="64" cy="29" r="1.5" fill="#FFF"/><circle cx="50" cy="42" r="3" fill="#FF69B4"/><line x1="50" y1="42" x2="50" y2="50" stroke="#000" stroke-width="1.5"/><path d="M 42 50 Q 50 53 58 50" stroke="#000" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="28" cy="10" r="4" fill="#FFB6E1"/><circle cx="72" cy="10" r="4" fill="#FFB6E1"/><ellipse cx="32" cy="93" rx="7" ry="10" fill="url(#kitty-grad-kitty)"/><ellipse cx="68" cy="93" rx="7" ry="10" fill="url(#kitty-grad-kitty)"/></svg>
<br><strong>💕 Hello Kitty</strong><br>15 pts · White/Pink
</td>
</tr>
<tr>
<td align="center">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="angel-grad-angel"><stop offset="0%" style="stop-color:#FFE4FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFB6E1;stop-opacity:1" /></radialGradient></defs><circle cx="50" cy="8" r="10" fill="none" stroke="#FFD700" stroke-width="1.5"/><ellipse cx="15" cy="40" rx="8" ry="18" fill="#FFE4FF" opacity="0.7"/><ellipse cx="85" cy="40" rx="8" ry="18" fill="#FFE4FF" opacity="0.7"/><ellipse cx="50" cy="65" rx="23" ry="28" fill="url(#angel-grad-angel)"/><circle cx="50" cy="32" r="20" fill="url(#angel-grad-angel)"/><ellipse cx="36" cy="28" rx="6" ry="8" fill="#87CEEB"/><ellipse cx="64" cy="28" rx="6" ry="8" fill="#87CEEB"/><circle cx="36" cy="28" r="3" fill="#000"/><circle cx="64" cy="28" r="3" fill="#000"/><path d="M 40 42 Q 50 48 60 42" stroke="#FFB6E1" stroke-width="2" fill="none" stroke-linecap="round"/><polygon points="20,30 22,35 27,35 23,39 25,44 20,40 15,44 17,39 13,35 18,35" fill="#FFD700"/><polygon points="80,30 82,35 87,35 83,39 85,44 80,40 75,44 77,39 73,35 78,35" fill="#FFD700"/><ellipse cx="35" cy="95" rx="7" ry="10" fill="url(#angel-grad-angel)"/><ellipse cx="65" cy="95" rx="7" ry="10" fill="url(#angel-grad-angel)"/></svg>
<br><strong>✨ Chibi Angel</strong><br>18 pts · Pastel Pink
</td>
<td align="center">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="sakura-grad-sakura"><stop offset="0%" style="stop-color:#FFE4FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFB6E1;stop-opacity:1" /></radialGradient><radialGradient id="sakura-hair-sakura"><stop offset="0%" style="stop-color:#FFC0CB;stop-opacity:1" /><stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" /></radialGradient></defs><ellipse cx="50" cy="18" rx="25" ry="15" fill="url(#sakura-hair-sakura)"/><circle cx="50" cy="35" r="20" fill="url(#sakura-grad-sakura)"/><path d="M 35 32 Q 35 35 38 33" stroke="#000" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M 65 32 Q 65 35 62 33" stroke="#000" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="20" cy="40" r="8" fill="#FFB6E1" opacity="0.6"/><circle cx="80" cy="40" r="8" fill="#FFB6E1" opacity="0.6"/><ellipse cx="50" cy="65" rx="22" ry="26" fill="url(#sakura-grad-sakura)"/><circle cx="25" cy="15" r="5" fill="#FF1493"/><circle cx="30" cy="12" r="4" fill="#FF69B4"/><circle cx="20" cy="12" r="4" fill="#FF69B4"/><ellipse cx="32" cy="93" rx="7" ry="10" fill="url(#sakura-grad-sakura)"/><ellipse cx="68" cy="93" rx="7" ry="10" fill="url(#sakura-grad-sakura)"/></svg>
<br><strong>🌸 Sakura Chibi</strong><br>18 pts · Pink
</td>
<td align="center">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="purple-grad-purple"><stop offset="0%" style="stop-color:#E6B3FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#B366FF;stop-opacity:1" /></radialGradient></defs><circle cx="50" cy="55" r="28" fill="url(#purple-grad-purple)"/><circle cx="50" cy="28" r="22" fill="url(#purple-grad-purple)"/><ellipse cx="36" cy="24" rx="5" ry="7" fill="#FFF"/><ellipse cx="64" cy="24" rx="5" ry="7" fill="#FFF"/><circle cx="36" cy="26" r="3" fill="#000"/><circle cx="64" cy="26" r="3" fill="#000"/><path d="M 38 36 Q 50 42 62 36" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="22" cy="12" r="8" fill="url(#purple-grad-purple)"/><circle cx="78" cy="12" r="8" fill="url(#purple-grad-purple)"/><circle cx="18" cy="30" r="6" fill="#FF69B4" opacity="0.5"/><circle cx="82" cy="30" r="6" fill="#FF69B4" opacity="0.5"/><ellipse cx="32" cy="88" rx="8" ry="12" fill="url(#purple-grad-purple)"/><ellipse cx="68" cy="88" rx="8" ry="12" fill="url(#purple-grad-purple)"/></svg>
<br><strong>💜 Purple Plushie</strong><br>16 pts · Purple
</td>
<td align="center">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="ribbon-grad-ribbon"><stop offset="0%" style="stop-color:#FFF;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFE4E1;stop-opacity:1" /></radialGradient></defs><path d="M 20 10 Q 15 25 22 35" stroke="#FF69B4" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M 80 10 Q 85 25 78 35" stroke="#FF69B4" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="62" rx="23" ry="27" fill="url(#ribbon-grad-ribbon)"/><circle cx="50" cy="32" r="20" fill="url(#ribbon-grad-ribbon)"/><circle cx="37" cy="28" r="5" fill="#FFB6E1" opacity="0.8"/><circle cx="63" cy="28" r="5" fill="#FFB6E1" opacity="0.8"/><circle cx="37" cy="28" r="2.5" fill="#000"/><circle cx="63" cy="28" r="2.5" fill="#000"/><path d="M 40 40 Q 50 45 60 40" stroke="#FF69B4" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="48" rx="15" ry="12" fill="#FF69B4"/><circle cx="38" cy="46" r="6" fill="#FF69B4"/><circle cx="62" cy="46" r="6" fill="#FF69B4"/><ellipse cx="32" cy="92" rx="7" ry="10" fill="url(#ribbon-grad-ribbon)"/><ellipse cx="68" cy="92" rx="7" ry="10" fill="url(#ribbon-grad-ribbon)"/></svg>
<br><strong>🎀 Ribbon Cutie</strong><br>14 pts · White/Pink
</td>
<td align="center">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="star-grad-star"><stop offset="0%" style="stop-color:#FFFF99;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" /></radialGradient></defs><polygon points="50,10 61,35 88,40 69,57 75,85 50,68 25,85 31,57 12,40 39,35" fill="url(#star-grad-star)"/><circle cx="40" cy="32" r="5" fill="#000"/><circle cx="60" cy="32" r="5" fill="#000"/><circle cx="42" cy="30" r="1.5" fill="#FFF"/><circle cx="62" cy="30" r="1.5" fill="#FFF"/><path d="M 42 44 Q 50 50 58 44" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="25" cy="40" r="5" fill="#FFB6E1" opacity="0.6"/><circle cx="75" cy="40" r="5" fill="#FFB6E1" opacity="0.6"/><circle cx="50" cy="25" r="3" fill="#FFE4B5" opacity="0.8"/><circle cx="70" cy="55" r="3" fill="#FFE4B5" opacity="0.8"/><circle cx="30" cy="55" r="3" fill="#FFE4B5" opacity="0.8"/></svg>
<br><strong>⭐ Star Plushie</strong><br>17 pts · Gold
</td>
</tr>
</table>

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
