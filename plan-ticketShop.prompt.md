# Plan: Ticket Shop — Spend Tickets on Plushie Customizations & Perks

## Context

Tickets are currently earned (1 ticket per 5 points) but **never spent**. They're a vanity stat displayed on the HUD, splash screen, stats modal, and export report card. Adding a **Ticket Shop** gives them purpose: players spend accumulated tickets on cosmetic plushie accessories, machine themes, and light gameplay perks — creating incentive for great games without breaking balance.

### Economy Analysis

Based on real play data (7 games, all perfect):

| Tokens Left | Score | Tickets | Notes |
|-------------|-------|---------|-------|
| 1 | ~8M | ~1.6M | Floor — perfect game, 1 token left |
| 2 | ~42M | ~8.3M | |
| 3 | ~110M–206M | ~22M–41M | Mid-range |
| 5 | ~768M–1.2B | ~154M–244M | Ceiling — perfect game, max tokens |

- **Lifetime after 7 games:** ~473M tickets
- **Per-game range:** ~1.6M (worst perfect) to ~244M (best perfect)
- **Average per game:** ~67M
- Scores compound **exponentially**: base points → shiny ×10 on accumulated score → perfect game score²/100 → token bonus score × tokens³
- Tickets = score / 5 at every bonus stage, so they inherit the same exponential growth

Flat pricing would be trivially cheap after one good game. The shop must use **tiered pricing that respects the exponential curve**.

---

## Price Tiers

| Tier | Price Range | Feels Like… | Example Items |
|------|-------------|-------------|---------------|
| 🟢 Common | **500K – 2M** | One mediocre game or a fraction of a good one | Basic hat, simple bow, tiny scarf |
| 🔵 Uncommon | **5M – 15M** | One decent game (1–2 tokens left) | Sunglasses, halo, heart antenna, pastel machine theme |
| 🟣 Rare | **30M – 75M** | One great game (3 tokens left) | Crown, angel wings, cat ears, galaxy theme, neon claw skin |
| 🟡 Epic | **150M – 300M** | Best game ever or 2–3 great games | Golden claw skin, sakura storm theme, animated sparkle overlay |
| 🔴 Legendary | **500M – 1B** | Multiple perfect 5-token games | Gilded plushie variant, rainbow everything, custom title creator |
| 💎 Mythic | **2B – 5B** | Long-term grind (30+ great games) | Ultimate flex cosmetics, "completionist" badge, animated background |

---

## Shop Categories

### 1. 🎩 Plushie Accessories

Wearable accessories rendered as SVG overlays by `PlushieFactory` on top of existing plushie SVGs. Unlocked accessories are randomly applied to plushies in future games. Persist in `localStorage`.

| Item | Tier | Price |
|------|------|-------|
| Tiny Bow | 🟢 Common | 500K |
| Mini Top Hat | 🟢 Common | 1M |
| Simple Scarf | 🟢 Common | 1.5M |
| Star Sunglasses | 🔵 Uncommon | 5M |
| Floating Halo | 🔵 Uncommon | 10M |
| Heart Antenna | 🔵 Uncommon | 8M |
| Royal Crown | 🟣 Rare | 40M |
| Angel Wings | 🟣 Rare | 60M |
| Cat Ears | 🟣 Rare | 35M |
| Diamond Tiara | 🟡 Epic | 200M |
| Phoenix Wings | 🟡 Epic | 250M |
| Cosmic Aura | 🔴 Legendary | 750M |
| Rainbow Trail | 💎 Mythic | 3B |

### 2. 🎨 Machine Themes & Claw Skins

Alternate colour schemes for the claw machine SVG and claw assembly. Purely cosmetic — changes stroke colours, fills, and glow filters via CSS classes on the SVG.

| Item | Tier | Price |
|------|------|-------|
| Pastel Dream (soft pinks/lavender) | 🔵 Uncommon | 8M |
| Ocean Neon (teals/aqua) | 🔵 Uncommon | 12M |
| Midnight Galaxy (deep purple/stars) | 🟣 Rare | 50M |
| Sakura Storm (pink petals) | 🟡 Epic | 175M |
| Golden Luxe (gold/black) | 🟡 Epic | 250M |
| Rainbow Prism | 🔴 Legendary | 600M |
| Holographic | 💎 Mythic | 2.5B |

**Claw Skins:**

| Item | Tier | Price |
|------|------|-------|
| Cat Paw Claw | 🟣 Rare | 45M |
| Star Claw | 🟣 Rare | 55M |
| Golden Claw | 🟡 Epic | 200M |
| Rainbow Claw | 🔴 Legendary | 500M |

### 3. 🪙 Buy Extra Starting Tokens (Gameplay Perk)

Before a game starts, spend tickets to add extra starting tokens. Capped at +2 (max 7 starting tokens). The cubic token bonus at end-of-game already incentivises *not using* tokens, so more starting tokens = more chances but the bonus multiplier self-corrects balance.

| Perk | Price | Notes |
|------|-------|-------|
| +1 Starting Token | 15M per game | Consumed each game, not permanent |
| +2 Starting Tokens | 35M per game | Consumed each game, not permanent |

These are **consumable** (spent per game, not unlocked forever) to act as a ticket sink and prevent runaway inflation.

### 4. 🏅 Titles & Badges

Kawaii titles displayed on the report card export and splash screen. Some are milestone-gated (unlocked by achievement + ticket purchase), others are pure ticket purchases.

| Title | Tier | Price | Requirement |
|-------|------|-------|-------------|
| "Plushie Fan" | 🟢 Common | 1M | — |
| "Claw Enthusiast" | 🔵 Uncommon | 10M | 10+ games played |
| "Shiny Hunter ✨" | 🟣 Rare | 30M | 10+ shinies caught |
| "Perfect Gamer 🎊" | 🟣 Rare | 50M | 5+ perfect games |
| "Plushie Master" | 🟡 Epic | 150M | 50+ games played |
| "Legendary Collector" | 🔴 Legendary | 500M | 100+ plushies caught |
| "God Gamer 👑" | 💎 Mythic | 2B | 25+ perfect games |

### 5. 🌟 Golden Plushie Variants

Spend a large ticket amount to "gild" a specific plushie type. Gilded plushies get a golden gradient overlay in `PlushieFactory` and appear occasionally in future games as a cosmetic flex (same points, just golden).

| Action | Price |
|--------|-------|
| Gild any plushie type | 🔴 Legendary — 750M each |
| Gild ALL plushie types | 💎 Mythic — 5B (discounted bundle) |

---

## Implementation Steps

### Step 1: Persistent Wallet

- In `script.js` / `GameHistory`, add `lifetimeTicketsSpent` tracking to `localStorage`.
- Compute **spendable balance** as `lifetimeTickets - lifetimeTicketsSpent`.
- Display wallet balance in the shop UI and on the stats screen (new row: "🎟️ Ticket Balance").

### Step 2: Shop State Module (`shop.js`)

- New file: `shop.js`
- Manages:
  - `unlockedItems: string[]` — IDs of purchased items
  - `equippedItems: { accessory: string | null, theme: string | null, clawSkin: string | null, title: string | null }` — currently active cosmetics
  - `gildedPlushies: string[]` — plushie types that have been gilded
  - `extraTokensPurchased: number` — 0, 1, or 2 for the next game
- All persisted to `localStorage` under a `kawaiiClawShop` key.
- Purchase function: validates balance ≥ price, deducts from wallet (increments `lifetimeTicketsSpent`), adds item to unlocked list.

### Step 3: Shop UI Overlay

- New modal in `index.html`, same pattern as the stats modal (`#shop-overlay` → `.shop-card`).
- Tabbed layout: **Accessories** | **Themes** | **Claw Skins** | **Tokens** | **Titles** | **Golden**
- Each item card shows:
  - SVG preview (for accessories: a sample plushie wearing it; for themes: a mini machine preview)
  - Name, tier badge (colour-coded), price
  - State: 🔒 Locked / 💰 Buy / ✅ Owned / ⭐ Equipped
- Wallet balance displayed prominently at the top.
- Wire `Escape` key and overlay-click-to-close, same as stats modal.

### Step 4: Extend `PlushieFactory` for Accessories

- `createPlushieSVG(type, size, options?)` — new optional `options` parameter:
  - `options.accessory: string | null` — accessory ID to overlay
  - `options.gilded: boolean` — apply golden gradient filter
- Each accessory is a static SVG snippet method (e.g. `PlushieFactory.createAccessoryOverlay('crown', size)`) that returns positioned SVG elements to layer on top.
- Accessories are positioned relative to the plushie's head center (consistent across all 10 types).

### Step 5: Machine Themes & Claw Skins

- Define theme presets as objects mapping CSS custom properties (`--machine-stroke`, `--machine-fill`, `--claw-color`, `--glow-color`, etc.).
- Apply active theme by setting a `data-theme="themeName"` attribute on the `<svg class="claw-machine-svg">` element.
- Add corresponding CSS rules in `styles.css` using `[data-theme="..."]` selectors to override stroke/fill colours.
- Claw skins: swap the claw SVG paths/shapes via JS when a skin is equipped, or use CSS class overrides for simpler skins.

### Step 6: Wire Cosmetics into Gameplay

- **`initGame()`**: read `extraTokensPurchased` from shop state, add to starting tokens, reset to 0 after use.
- **`generatePrizes()`**: for each prize, if the plushie type is gilded, set a `gilded: true` flag. Pass equipped accessory to SVG rendering.
- **`addCaughtPrize()`**: pass accessory + gilded state to `PlushieFactory.createPlushieSVG()`.
- **Splash screen / report card**: render plushies with their accessories and gilded state. Show equipped title.
- **Machine SVG**: apply equipped theme + claw skin on game init.

### Step 7: Shop Button

- Add `🛒 SHOP` button to the controls row in `index.html`, between STATS and NEW GAME.
- Always enabled (like STATS), opens the shop overlay.
- Wire event listener in `script.js` `window.load`.

---

## Files to Create/Modify

| File | Action | Changes |
|------|--------|---------|
| `shop.js` | **Create** | Shop state management, purchase logic, item definitions, pricing |
| `index.html` | **Modify** | Add shop overlay HTML, add `<script src="shop.js">`, add 🛒 SHOP button |
| `script.js` | **Modify** | Wallet tracking, wire shop button, pass cosmetics to rendering, extra token logic in `initGame` |
| `plushie-factory.js` | **Modify** | Add `options` param to `createPlushieSVG`, accessory overlay methods, gilded gradient filter |
| `styles.css` | **Modify** | Shop modal styles, theme CSS custom properties, tier badge colours, gilded plushie glow |

---

## Design Decisions to Confirm

1. **Equip system**: Recommend **one accessory + one theme + one claw skin + one title** equipped at a time. Simpler UX, cleaner rendering. Multi-stacking accessories would be cuter but significantly more SVG layout work.

2. **Extra tokens**: Consumable per-game (ticket sink) vs permanent unlock? Consumable is better for economy health — prevents infinite inflation.

3. **Accessory visibility**: Should accessories appear on plushies inside the machine (during gameplay) AND in the caught/splash/report views, or only in post-game displays? Recommend both for maximum satisfaction.

4. **Gilded plushies frequency**: When a plushie type is gilded, what % of that type spawns golden? Suggest ~30% chance per gilded type, so it's visible but not every instance.

