// Game state
const gameState = {
    score: 0,
    tickets: 0,
    tokens: 5,
    clawX: 350,
    clawY: 160,
    isGrabbing: false,
    gameOver: false,
    prizes: [],
    caughtPrizes: [],
    shinyPrizeId: null,
    isPerfectGame: false,
    lastShinyCatchAt: 0,
    bonusMessageTimeoutId: null,
    bonusMessageClearTimeoutId: null,
    audioContext: null,
    soundEnabled: localStorage.getItem('kawaiiClawSoundEnabled') !== 'false',
    lastMoveSoundAt: 0,
    plushiedexKnownTypes: new Set(),
    plushiedexKnownShinies: new Set()
};

// Configuration
const CONFIG = {
    GLASS_BOX_LEFT: 70,
    GLASS_BOX_TOP: 130,
    GLASS_BOX_WIDTH: 560,
    GLASS_BOX_HEIGHT: 420,
    CLAW_HOME_X: 350,
    CLAW_HOME_Y: 130,
    CLAW_ASSEMBLY_BASE_X: 350,
    CLAW_ASSEMBLY_BASE_Y: 300,
    CLAW_SPEED: 8,
    CLAW_RADIUS: 40,
    CLAW_CATCH_OFFSET_Y: 41, // offset from clawY to geometric center of claw SVG assembly
    MAX_TOKENS: 5,
    PRIZE_COUNT: 12,
    PERFECT_GAME_BONUS: 500,
    BONUS_DISPLAY_MS: 2000,
    PERFECT_BONUS_DISPLAY_MS: 2000,
    SHINY_BONUS_POINTS: 1000,
    SHINY_TO_BONUS_DELAY_MS: 2000,
    MULTI_CATCH_BASE_BONUS: 100,       // Base bonus points for catching 2+ (scales quadratically)
    MULTI_CATCH_LABELS: [
        '',                  // 0 - unused
        '',                  // 1 - no bonus for single catch
        '🎯 DOUBLE CATCH!',  // 2
        '🔥 TRIPLE CATCH!',  // 3
        '💥 QUAD CATCH!',    // 4
        '🌟 MEGA CATCH!',    // 5+
    ],
    PRIZE_SIZE: 82,
    PRIZE_RADIUS: 41,
    PRIZE_EDGE_PADDING: 22,
    PRIZE_ROW_TOP_PADDING: 52,
    PRIZE_SPAWN_ATTEMPTS: 60,
    PLUSHIEDEX_COMPLETION_BONUS_TICKETS: 10_000_000_000,
    PRIZE_TYPES: [
        { emoji: '🎵', name: 'Miku', points: 20 },
        { emoji: '🎶', name: 'Teto', points: 20 },
        { emoji: '🐰', name: 'My Melody', points: 15 },
        { emoji: '🖤', name: 'Kuromi', points: 25 },
        { emoji: '💕', name: 'Hello Kitty', points: 15 },
        { emoji: '✨', name: 'Chibi Angel', points: 18 },
        { emoji: '🌸', name: 'Sakura Chibi', points: 18 },
        { emoji: '💜', name: 'Purple Plushie', points: 16 },
        { emoji: '🎀', name: 'Ribbon Cutie', points: 14 },
        { emoji: '⭐', name: 'Star Plushie', points: 17 }
    ]
};

// Plushie Personalities — shown in detail overlay (collection & plushiedex)
const PLUSHIE_PERSONALITIES = {
    'miku':   'Miku is a diva <3 She is always positive, likes to cheer others up, a little bit air-headed but boi can she sing. SEEKAAA~~~~ (forgets lyrics) XD',
    'teto':   'She is a more mischievous vocaloid (fight me) than Miku. She always fights for recognition, loves to eat baguettes 🥖 and you can in general trust her. She is a little bit tsundere so be careful when you encounter Teto >_<',
    'melody': 'Personality pending!! >_<',
    'kuromi': 'Personality pending!! >_<',
    'kitty':  'Personality pending!! >_<',
    'angel':  'Personality pending!! >_<',
    'sakura': 'Personality pending!! >_<',
    'purple': 'Personality pending!! >_<',
    'ribbon': 'Personality pending!! >_<',
    'star':   'Personality pending!! >_<',
};

// Kawaii kaomojis for decoration
const KAOMOJIS = [
    '(◕‿◕✿)', '(ノ◕ヮ◕)ノ*:・゚✧', '(✿◠‿◠)', '(◕ᴗ◕✿)',
    '(˶ᵔ ᵕ ᵔ˶)', '(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠✧⁠*', '(⁠ ⁠╹⁠▽⁠╹⁠ ⁠)', '✧(◕ヮ◕)✧',
    '(⁠≧⁠▽⁠≦⁠)', '(⁠◠⁠‿⁠◕⁠)', '(⁠◕⁠દ⁠◕⁠)', '♡(◕ᗜ◕✿)',
    '(˶˃ ᵕ ˂˶)', '(✧ω✧)', '(⁠✿⁠^⁠‿⁠^⁠)', '(⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)',
    '✿(◕‿◕)✿', '(ﾉ◕ヮ◕)ﾉ✿', '(◕‿◕)♡', '(*≧ω≦)',
    '(⁠◕⁠ᴗ⁠◕⁠✿⁠)', '(⁠✯⁠ᴗ⁠✯⁠)', '(⁠人⁠*⁠´⁠∀⁠`⁠)⁠｡⁠*ﾟ⁠+', '♪(◕ᴗ◕✿)',
    '(˶ˆᗜˆ˵)', '(✿˶˘ ᵕ ˘˶)', '(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠♡', '✧˖°(◕‿◕✿)°˖✧',
    '(⁠≧⁠◡⁠≦⁠)⁠♡', 'ヾ(◕ᗜ◕)ﾉ✿', '(◕‿◕)☆', '(✿ᵕᴗᵕ)ノ'
];

// ===== Persistent Game History (localStorage) =====
const HISTORY_KEY = 'kawaiiClawGameHistory';
const PLUSHIEDEX_BONUS_KEY = 'kawaiiClawPlushiedexCompletionBonus';
const MAX_HISTORY = 500;

const GameHistory = {
    getAll() {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch { return []; }
    },

    save(record) {
        const history = this.getAll();
        history.unshift(record); // newest first
        if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    },

    getLifetimeStats() {
        const history = this.getAll();
        const plushiedexBonus = this.getPlushiedexCompletionBonus();
        return {
            totalGames: history.length,
            lifetimeScore: history.reduce((s, r) => s + r.score, 0),
            lifetimeTickets: history.reduce((s, r) => s + r.tickets, 0) + plushiedexBonus,
            totalPlushies: history.reduce((s, r) => s + r.plushiesCaught, 0),
            totalShinies: history.reduce((s, r) => s + r.shinyCaught, 0),
            perfectGames: history.filter(r => r.isPerfectGame).length,
            bestScore: history.length ? Math.max(...history.map(r => r.score)) : 0,
            plushiedexCompletionBonus: plushiedexBonus,
        };
    },

    getPlushiedexCompletionBonus() {
        return parseInt(localStorage.getItem(PLUSHIEDEX_BONUS_KEY)) || 0;
    },

    awardPlushiedexCompletionBonus(amount) {
        localStorage.setItem(PLUSHIEDEX_BONUS_KEY, String(amount));
    },

    hasPlushiedexCompletionBonus() {
        return !!localStorage.getItem(PLUSHIEDEX_BONUS_KEY);
    },

    clear() {
        localStorage.removeItem(HISTORY_KEY);
        localStorage.removeItem(PLUSHIEDEX_BONUS_KEY);
    }
};

// ===== Tutorial (first-visit detection) =====
const TUTORIAL_SEEN_KEY = 'kawaiiClawTutorialSeen';

function openTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'flex';
}

function closeTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'none';
    localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
}

function showTutorialIfFirstVisit() {
    if (!localStorage.getItem(TUTORIAL_SEEN_KEY)) {
        openTutorial();
    }
}

function getRandomKaomojis(count) {
    const shuffled = [...KAOMOJIS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function randomizeKaomojiStyle(el) {
    // Random drift direction and distance
    const dx = (-20 + Math.random() * 40).toFixed(1);  // -20px to +20px
    const dy = (-18 + Math.random() * 36).toFixed(1);  // -18px to +18px
    // Random rotation range
    const rotFrom = (-8 + Math.random() * 6).toFixed(1);   // -8deg to -2deg
    const rotTo = (2 + Math.random() * 6).toFixed(1);      // +2deg to +8deg
    // Random drift speed
    const driftDur = (3 + Math.random() * 5).toFixed(2);   // 3s to 8s
    // Random pulse speed (independent)
    const pulseDur = (2 + Math.random() * 4).toFixed(2);   // 2s to 6s
    // Random opacity range
    const opLo = (0.15 + Math.random() * 0.15).toFixed(2); // 0.15 to 0.30
    const opHi = (0.4 + Math.random() * 0.2).toFixed(2);   // 0.40 to 0.60

    el.style.setProperty('--kao-dx', `${dx}px`);
    el.style.setProperty('--kao-dy', `${dy}px`);
    el.style.setProperty('--kao-rot-from', `${rotFrom}deg`);
    el.style.setProperty('--kao-rot-to', `${rotTo}deg`);
    el.style.setProperty('--kao-drift-dur', `${driftDur}s`);
    el.style.setProperty('--kao-pulse-dur', `${pulseDur}s`);
    el.style.setProperty('--kao-opacity-lo', opLo);
    el.style.setProperty('--kao-opacity-hi', opHi);
    // Random start offset so they don't sync
    el.style.animationDelay = `${(-Math.random() * 8).toFixed(2)}s`;
}

function spawnKaomojis() {
    // Remove old kaomojis
    document.querySelectorAll('.floating-kaomoji').forEach(el => el.remove());

    const container = document.querySelector('.caught-section');
    if (!container) return;

    const count = 10 + Math.floor(Math.random() * 6); // 10-15 kaomojis
    const kaomojis = getRandomKaomojis(count);

    kaomojis.forEach((kao) => {
        const el = document.createElement('div');
        el.className = 'floating-kaomoji';
        el.textContent = kao;
        el.setAttribute('aria-hidden', 'true');

        // Scatter randomly across the caught section background
        const top = 5 + Math.random() * 88;
        const left = 3 + Math.random() * 85;

        el.style.top = `${top}%`;
        el.style.left = `${left}%`;
        randomizeKaomojiStyle(el);

        container.appendChild(el);
    });
}

function populateKaomojiDecorations(parentEl, className) {
    if (!parentEl) return;

    // Remove old ones
    parentEl.querySelectorAll(`.${className}`).forEach(el => el.remove());

    const positions = [
        { top: '1%', left: '2%' },
        { top: '1%', right: '2%' },
        { top: '12%', left: '1%' },
        { top: '15%', right: '1%' },
        { top: '35%', left: '0%' },
        { top: '38%', right: '0%' },
        { top: '58%', left: '1%' },
        { top: '62%', right: '1%' },
        { bottom: '12%', left: '2%' },
        { bottom: '10%', right: '2%' },
        { bottom: '2%', left: '3%' },
        { bottom: '2%', right: '3%' },
    ];

    const kaos = getRandomKaomojis(positions.length);

    positions.forEach((pos, i) => {
        const el = document.createElement('div');
        el.className = className;
        el.textContent = kaos[i];
        el.setAttribute('aria-hidden', 'true');

        Object.entries(pos).forEach(([prop, val]) => {
            el.style[prop] = val;
        });

        randomizeKaomojiStyle(el);
        parentEl.appendChild(el);
    });
}

function ensureAudioContext() {
    if (!gameState.soundEnabled) return null;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;

    if (!gameState.audioContext) {
        gameState.audioContext = new AudioContextCtor();
    }

    if (gameState.audioContext.state === 'suspended') {
        gameState.audioContext.resume().catch(() => {});
    }

    return gameState.audioContext;
}

function playTone(ctx, frequency, startAt, duration, type = 'sine', gainAmount = 0.04) {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(gainAmount, startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
}

function playSound(effect) {
    if (!gameState.soundEnabled) return;

    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + 0.005;

    switch (effect) {
        case 'move':
            playTone(ctx, 540 + Math.random() * 35, now, 0.04, 'square', 0.014);
            break;
        case 'grab':
            playTone(ctx, 260, now, 0.08, 'triangle', 0.03);
            playTone(ctx, 180, now + 0.07, 0.09, 'sawtooth', 0.028);
            break;
        case 'catch':
            playTone(ctx, 620, now, 0.09, 'triangle', 0.03);
            playTone(ctx, 830, now + 0.05, 0.1, 'sine', 0.022);
            break;
        case 'shiny':
            playTone(ctx, 880, now, 0.14, 'triangle', 0.03);
            playTone(ctx, 1170, now + 0.06, 0.16, 'sine', 0.026);
            playTone(ctx, 1480, now + 0.13, 0.18, 'sine', 0.02);
            break;
        case 'bonus':
            playTone(ctx, 680, now, 0.1, 'square', 0.026);
            playTone(ctx, 920, now + 0.08, 0.12, 'triangle', 0.024);
            break;
        case 'perfect':
            playTone(ctx, 784, now, 0.14, 'triangle', 0.03);
            playTone(ctx, 988, now + 0.12, 0.16, 'triangle', 0.028);
            playTone(ctx, 1318, now + 0.23, 0.2, 'sine', 0.024);
            break;
        case 'gameOver':
            playTone(ctx, 330, now, 0.12, 'sawtooth', 0.028);
            playTone(ctx, 220, now + 0.1, 0.18, 'triangle', 0.024);
            break;
        case 'plushiedexNew':
            playTone(ctx, 660, now, 0.1, 'sine', 0.025);
            playTone(ctx, 880, now + 0.08, 0.12, 'triangle', 0.025);
            playTone(ctx, 1100, now + 0.16, 0.14, 'sine', 0.022);
            playTone(ctx, 1320, now + 0.26, 0.18, 'sine', 0.018);
            break;
        case 'plushiedexComplete':
            playTone(ctx, 523, now, 0.15, 'triangle', 0.03);
            playTone(ctx, 659, now + 0.1, 0.15, 'triangle', 0.03);
            playTone(ctx, 784, now + 0.2, 0.15, 'triangle', 0.03);
            playTone(ctx, 1047, now + 0.3, 0.2, 'sine', 0.028);
            playTone(ctx, 1319, now + 0.42, 0.22, 'sine', 0.025);
            playTone(ctx, 1568, now + 0.56, 0.3, 'sine', 0.022);
            playTone(ctx, 2093, now + 0.72, 0.4, 'sine', 0.018);
            break;
    }
}

function updateSoundButton() {
    const soundBtn = document.getElementById('sound-btn');
    if (!soundBtn) return;

    soundBtn.textContent = gameState.soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF';
    soundBtn.setAttribute('aria-pressed', gameState.soundEnabled ? 'true' : 'false');
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    localStorage.setItem('kawaiiClawSoundEnabled', gameState.soundEnabled ? 'true' : 'false');
    updateSoundButton();

    if (gameState.soundEnabled) {
        ensureAudioContext();
        playSound('bonus');
    }
}

function clearBonusMessageTimers() {
    if (gameState.bonusMessageTimeoutId) {
        clearTimeout(gameState.bonusMessageTimeoutId);
        gameState.bonusMessageTimeoutId = null;
    }

    if (gameState.bonusMessageClearTimeoutId) {
        clearTimeout(gameState.bonusMessageClearTimeoutId);
        gameState.bonusMessageClearTimeoutId = null;
    }
}

function showBonusCard(contentHTML, statusMessage, durationMs = CONFIG.BONUS_DISPLAY_MS) {
    const bonusEl = document.getElementById('bonus-message');
    if (!bonusEl) return;

    clearBonusMessageTimers();
    bonusEl.innerHTML = contentHTML;
    bonusEl.classList.add('show');

    if (statusMessage) {
        displayGameStatus(statusMessage);
    }

    gameState.bonusMessageTimeoutId = setTimeout(() => {
        bonusEl.classList.remove('show');

        gameState.bonusMessageClearTimeoutId = setTimeout(() => {
            bonusEl.innerHTML = '';
            if (!gameState.gameOver) {
                clearGameStatus();
            }
        }, 500);
    }, durationMs);
}

function showShinyCatchBurst(bonusAmount) {
    const stage = document.querySelector('.machine-stage');
    if (!stage) return;

    const burst = document.createElement('div');
    burst.className = 'shiny-catch-burst';
    burst.innerHTML = `<span>✨ SHINY BONUS +${bonusAmount} POINTS</span>`;
    stage.appendChild(burst);

    setTimeout(() => {
        burst.remove();
    }, 1200);
}

// ===== Plushiedex New-Discovery Detection =====

function buildPlushiedexSnapshot() {
    const history = GameHistory.getAll();
    gameState.plushiedexKnownTypes = new Set();
    gameState.plushiedexKnownShinies = new Set();
    history.forEach(record => {
        if (!record.prizes) return;
        record.prizes.forEach(p => {
            if (p.shiny) {
                gameState.plushiedexKnownShinies.add(p.emoji);
            } else {
                gameState.plushiedexKnownTypes.add(p.emoji);
            }
        });
    });
}

function isNewPlushiedexEntry(prize) {
    if (prize.shiny) {
        return !gameState.plushiedexKnownShinies.has(prize.emoji);
    }
    return !gameState.plushiedexKnownTypes.has(prize.emoji);
}

function markPlushiedexSeen(prize) {
    if (prize.shiny) {
        gameState.plushiedexKnownShinies.add(prize.emoji);
    } else {
        gameState.plushiedexKnownTypes.add(prize.emoji);
    }
}

function showNewPlushiedexToast(prize) {
    const stage = document.querySelector('.machine-stage');
    if (!stage) return;

    const existingToasts = stage.querySelectorAll('.plushiedex-new-toast');
    const offsetTop = 52 + existingToasts.length * 40;

    const variant = prize.shiny ? '✨ Shiny ' : '';
    const toast = document.createElement('div');
    toast.className = 'plushiedex-new-toast';
    toast.style.top = `${offsetTop}px`;
    toast.innerHTML = `<span>📖 NEW! ${variant}${prize.name} added to Plushiedex!</span>`;
    stage.appendChild(toast);

    playSound('plushiedexNew');

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function renderNewDexSection(container, newEntries) {
    if (!container) return;
    if (!newEntries || newEntries.length === 0) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'block';

    const list = container.querySelector('.new-dex-list');
    if (!list) return;
    list.innerHTML = '';

    newEntries.forEach(prize => {
        const chip = document.createElement('span');
        chip.className = 'new-dex-chip';
        if (prize.shiny) chip.classList.add('new-dex-chip-shiny');

        const svg = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(prize.emoji),
            28
        );
        chip.innerHTML = `${svg} <span>${prize.shiny ? '✨ ' : ''}${prize.name}</span>`;
        list.appendChild(chip);
    });
}

function isPlushiedexComplete() {
    const totalTypes = CONFIG.PRIZE_TYPES.length;
    return gameState.plushiedexKnownTypes.size >= totalTypes
        && gameState.plushiedexKnownShinies.size >= totalTypes;
}

function checkAndAwardPlushiedexCompletion() {
    // Only award once, ever
    if (GameHistory.hasPlushiedexCompletionBonus()) return;
    if (!isPlushiedexComplete()) return;

    const bonus = CONFIG.PLUSHIEDEX_COMPLETION_BONUS_TICKETS;
    GameHistory.awardPlushiedexCompletionBonus(bonus);
    gameState.plushiedexCompletionAwarded = true;
    showPlushiedexCompletionToast(bonus);
}

function showPlushiedexCompletionToast(bonus) {
    const stage = document.querySelector('.machine-stage');
    if (!stage) return;

    const toast = document.createElement('div');
    toast.className = 'plushiedex-complete-toast';
    toast.innerHTML = `
        <div class="plushiedex-complete-toast-line">📖🎊 PLUSHIEDEX COMPLETE! 🎊📖</div>
        <div class="plushiedex-complete-toast-bonus">+${bonus.toLocaleString()} Lifetime Tickets!</div>
    `;
    stage.appendChild(toast);

    playSound('plushiedexComplete');

    setTimeout(() => {
        toast.remove();
    }, 7000);
}

// Initialize game
function initGame() {

    // Snapshot the plushiedex known entries BEFORE this game starts
    buildPlushiedexSnapshot();

    gameState.score = 0;
    gameState.tickets = 0;
    gameState.tokens = 5;
    gameState.clawX = CONFIG.CLAW_HOME_X;
    gameState.clawY = CONFIG.CLAW_HOME_Y;
    gameState.isGrabbing = false;
    gameState.gameOver = false;
    gameState.isPerfectGame = false;
    gameState.prizes = [];
    gameState.caughtPrizes = [];
    gameState.shinyPrizeId = null;
    gameState.lastShinyCatchAt = 0;
    gameState.lastTokenBonus = 0;
    gameState.lastTokensLeft = 0;
    gameState.plushiedexCompletionAwarded = false;

    clearBonusMessageTimers();
    const bonusEl = document.getElementById('bonus-message');
    if (bonusEl) {
        bonusEl.classList.remove('show');
        bonusEl.innerHTML = '';
    }

    generatePrizes();
    updateUI();
    clearGameStatus();
    document.getElementById('caught-container').innerHTML = '';
    document.getElementById('export-btn').style.display = 'none';
    hideSplashScreen();

    // Enable all control buttons
    toggleButtons(true);

    resetClawPosition();
    spawnKaomojis();

}

// Generate random prizes in the glass box (SVG)
function generatePrizes() {

    const container = document.getElementById('prizes-svg-container');


    if (!container) {
        console.error('prizes-svg-container not found!');
        return;
    }

    container.innerHTML = '';
    gameState.prizes = [];
    gameState.shinyPrizeId = Math.floor(Math.random() * CONFIG.PRIZE_COUNT);

    for (let i = 0; i < CONFIG.PRIZE_COUNT; i++) {
        const prizeType = CONFIG.PRIZE_TYPES[Math.floor(Math.random() * CONFIG.PRIZE_TYPES.length)];
        const position = findSpawnPosition(gameState.prizes);
        const isShiny = i === gameState.shinyPrizeId;



        const prize = {
            id: i,
            x: position.x,
            y: position.y,
            emoji: prizeType.emoji,
            name: prizeType.name,
            points: prizeType.points,
            caught: false,
            type: prizeType.emoji,
            shiny: isShiny
        };

        gameState.prizes.push(prize);

        const prizeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        prizeGroup.id = `prize-${i}`;
        prizeGroup.setAttribute('data-prize-id', i);
        prizeGroup.setAttribute('transform', `translate(${prize.x - CONFIG.PRIZE_SIZE / 2}, ${prize.y - CONFIG.PRIZE_SIZE / 2})`);
        prizeGroup.style.transition = 'opacity 0.3s';

        if (isShiny) {
            const center = CONFIG.PRIZE_SIZE / 2;

            // Outer glow aura
            const outerAura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            outerAura.setAttribute('cx', center);
            outerAura.setAttribute('cy', center);
            outerAura.setAttribute('r', CONFIG.PRIZE_SIZE * 0.58);
            outerAura.setAttribute('fill', 'none');
            outerAura.classList.add('shiny-outer-aura');
            prizeGroup.appendChild(outerAura);

            // Inner aura ring
            const auraRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            auraRing.setAttribute('cx', center);
            auraRing.setAttribute('cy', center);
            auraRing.setAttribute('r', CONFIG.PRIZE_SIZE * 0.46);
            auraRing.setAttribute('fill', 'none');
            auraRing.classList.add('shiny-aura-ring');
            prizeGroup.appendChild(auraRing);

            const sparkleOffsets = [
                { x: 12, y: 14, cls: 'sparkle-a' },
                { x: CONFIG.PRIZE_SIZE - 12, y: 16, cls: 'sparkle-b' },
                { x: 16, y: CONFIG.PRIZE_SIZE - 14, cls: 'sparkle-c' },
                { x: CONFIG.PRIZE_SIZE - 14, y: CONFIG.PRIZE_SIZE - 12, cls: 'sparkle-d' }
            ];

            sparkleOffsets.forEach(({ x, y, cls }) => {
                const sparkle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                sparkle.setAttribute('cx', x);
                sparkle.setAttribute('cy', y);
                sparkle.setAttribute('r', 3);
                sparkle.classList.add('shiny-sparkle', cls);
                prizeGroup.appendChild(sparkle);
            });
        }

        try {
            const plushieSVGString = PlushieFactory.createPlushieSVG(
                PlushieFactory.getPrizeType(prizeType.emoji),
                CONFIG.PRIZE_SIZE
            );
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = plushieSVGString;
            const plushieSVG = tempDiv.querySelector('svg');

            while (plushieSVG.firstChild) {
                prizeGroup.appendChild(plushieSVG.firstChild);
            }

            container.appendChild(prizeGroup);

        } catch (error) {
            console.error(`Error creating prize ${i}:`, error);
        }
    }



}

function findSpawnPosition(existingPrizes) {
    const minX = CONFIG.GLASS_BOX_LEFT + CONFIG.PRIZE_EDGE_PADDING + CONFIG.PRIZE_RADIUS;
    const maxX = CONFIG.GLASS_BOX_LEFT + CONFIG.GLASS_BOX_WIDTH - CONFIG.PRIZE_EDGE_PADDING - CONFIG.PRIZE_RADIUS;
    const minY = CONFIG.GLASS_BOX_TOP + CONFIG.PRIZE_ROW_TOP_PADDING + CONFIG.PRIZE_RADIUS;
    const maxY = CONFIG.GLASS_BOX_TOP + CONFIG.GLASS_BOX_HEIGHT - CONFIG.PRIZE_EDGE_PADDING - CONFIG.PRIZE_RADIUS;

    for (let attempt = 0; attempt < CONFIG.PRIZE_SPAWN_ATTEMPTS; attempt++) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);

        const overlaps = existingPrizes.some(existing => {
            return Math.hypot(existing.x - x, existing.y - y) < CONFIG.PRIZE_SIZE * 0.9;
        });

        if (!overlaps) {
            return { x, y };
        }
    }

    // Fallback when chamber is crowded: allow a slightly overlapped placement.
    return {
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY)
    };
}

// Update UI elements
function updateUI() {
    document.getElementById('score').textContent = gameState.score.toLocaleString();
    document.getElementById('tickets').textContent = gameState.tickets.toLocaleString();
    document.getElementById('tokens').textContent = gameState.tokens;
}


// Move claw based on direction
function moveClaw(direction) {
    if (gameState.gameOver || gameState.isGrabbing) return;

    const step = CONFIG.CLAW_SPEED;
    const horizontalMargin = CONFIG.PRIZE_RADIUS;
    const topMargin = CONFIG.PRIZE_RADIUS * 0.65;
    const bottomMargin = CONFIG.PRIZE_RADIUS;

    const previousX = gameState.clawX;
    const previousY = gameState.clawY;

    switch(direction) {
        case 'left':
            gameState.clawX = Math.max(CONFIG.GLASS_BOX_LEFT + horizontalMargin, gameState.clawX - step);
            break;
        case 'right':
            gameState.clawX = Math.min(CONFIG.GLASS_BOX_LEFT + CONFIG.GLASS_BOX_WIDTH - horizontalMargin, gameState.clawX + step);
            break;
        case 'up':
            gameState.clawY = Math.max(CONFIG.GLASS_BOX_TOP, gameState.clawY - step);
            break;
        case 'down':
            gameState.clawY = Math.min(CONFIG.GLASS_BOX_TOP + CONFIG.GLASS_BOX_HEIGHT - bottomMargin, gameState.clawY + step);
            break;
    }

    updateClawPosition();

    if (previousX !== gameState.clawX || previousY !== gameState.clawY) {
        const now = Date.now();
        if (now - gameState.lastMoveSoundAt > 70) {
            gameState.lastMoveSoundAt = now;
            playSound('move');
        }
    }
}

// Cached DOM references for hot-path elements
let _clawAssembly = null;
let _clawArm = null;
let _topMotorRing = null;
let _topMotorDot = null;
let _topConnector = null;

function getCachedClawElements() {
    if (!_clawAssembly) _clawAssembly = document.getElementById('claw-assembly');
    if (!_clawArm) _clawArm = document.getElementById('claw-arm');
    if (!_topMotorRing) _topMotorRing = document.getElementById('top-motor-ring');
    if (!_topMotorDot) _topMotorDot = document.getElementById('top-motor-dot');
    if (!_topConnector) _topConnector = document.getElementById('top-connector');
}

// Update claw visual position in SVG
function updateClawPosition() {
    getCachedClawElements();

    const cx = gameState.clawX;

    // Top motor follows horizontally
    _topMotorRing.setAttribute('cx', cx);
    _topMotorDot.setAttribute('cx', cx);
    _topConnector.setAttribute('x1', cx);
    _topConnector.setAttribute('x2', cx);

    // Cable follows the claw horizontally; bottom end connects to the connector ring
    _clawArm.setAttribute('x1', cx);
    _clawArm.setAttribute('x2', cx);
    _clawArm.setAttribute('y2', gameState.clawY + 28);

    // Keep assembly movement anchored to the SVG's base claw geometry.
    const offsetX = cx - CONFIG.CLAW_ASSEMBLY_BASE_X;
    const offsetY = gameState.clawY - CONFIG.CLAW_ASSEMBLY_BASE_Y;

    _clawAssembly.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
}

// Reset claw to starting position
function resetClawPosition() {
    gameState.clawX = CONFIG.CLAW_HOME_X;
    gameState.clawY = CONFIG.CLAW_HOME_Y;
    updateClawPosition();
    openClaw();
}

// Grab/drop action
async function grabPrize() {
    if (gameState.gameOver || gameState.isGrabbing || gameState.tokens <= 0) return;

    gameState.tokens--;
    gameState.isGrabbing = true;

    // Disable buttons during grab
    toggleButtons(false);

    try {
        // Move claw down with prongs open
        await moveClawDown();
        await wait(150);

        // Mechanical wobble before grab
        getCachedClawElements();
        const baseX = gameState.clawX - CONFIG.CLAW_ASSEMBLY_BASE_X;
        const baseY = gameState.clawY - CONFIG.CLAW_ASSEMBLY_BASE_Y;
        _clawAssembly.setAttribute('transform', `translate(${baseX - 3}, ${baseY})`);
        await wait(60);
        _clawAssembly.setAttribute('transform', `translate(${baseX + 3}, ${baseY})`);
        await wait(60);
        _clawAssembly.setAttribute('transform', `translate(${baseX}, ${baseY})`);
        await wait(80);

        // Snap claws closed
        closeClaw();
        playSound('grab');
        await wait(350);

        // Check for caught prizes
        const caughtCount = await checkPrizeCollision();

        if (caughtCount > 1) {
            // Quadratic score bonus: base × count²
            const bonusPoints = CONFIG.MULTI_CATCH_BASE_BONUS * caughtCount * caughtCount;
            // Flat token bonus: +1 for any multi-catch (balanced)
            const bonusTokens = Math.min(CONFIG.MAX_TOKENS - gameState.tokens, 1);

            gameState.score += bonusPoints;
            gameState.tickets += Math.floor(bonusPoints / 5);
            if (bonusTokens > 0) {
                gameState.tokens += bonusTokens;
            }
            updateUI();
            showBonusMessage(caughtCount, bonusPoints, bonusTokens);
        }

        // Check if all prizes caught (Perfect Game!)
        const allCaught = gameState.prizes.every(prize => prize.caught);
        if (allCaught) {
            const elapsedSinceShiny = Date.now() - gameState.lastShinyCatchAt;
            if (elapsedSinceShiny < CONFIG.SHINY_TO_BONUS_DELAY_MS) {
                await wait(CONFIG.SHINY_TO_BONUS_DELAY_MS - elapsedSinceShiny);
            } else {
                await wait(500);
            }
            showPerfectGameBonus();
        }

        // Open claw fingers
        openClaw();
        await wait(200);

        // Move claw back up
        await moveClawUp();

        if (allCaught) {
            // Perfect game - wait for bonus message then end
            await wait(2500);
            gameState.isGrabbing = false;
            updateUI();
            endGame(true);
            return;
        }

    } finally {
        gameState.isGrabbing = false;
        updateUI();

        // Normal game over - ran out of tokens
        if (gameState.tokens <= 0 && !gameState.gameOver) {
            endGame(false);
        } else if (!gameState.gameOver) {
            toggleButtons(true);
        }
    }
}

// Close claw (grab animation)
function closeClaw() {
    const leftFinger = document.getElementById('left-finger');
    const rightFinger = document.getElementById('right-finger');
    const centerFinger = document.getElementById('center-finger');
    const glowCircle = document.getElementById('claw-glow');
    const motorLight = document.getElementById('claw-motor-light');

    // Rotate prongs inward around their pivot points
    if (leftFinger) leftFinger.setAttribute('transform', 'rotate(25, 338, 326)');
    if (rightFinger) rightFinger.setAttribute('transform', 'rotate(-25, 362, 326)');
    if (centerFinger) centerFinger.setAttribute('transform', 'translate(0, -8) scaleY(0.85)');
    if (glowCircle) glowCircle.style.opacity = '0.6';
    if (motorLight) motorLight.setAttribute('fill', '#00FFFF');
}

// Open claw (release)
function openClaw() {
    const leftFinger = document.getElementById('left-finger');
    const rightFinger = document.getElementById('right-finger');
    const centerFinger = document.getElementById('center-finger');
    const glowCircle = document.getElementById('claw-glow');
    const motorLight = document.getElementById('claw-motor-light');

    if (leftFinger) leftFinger.setAttribute('transform', 'rotate(0, 338, 326)');
    if (rightFinger) rightFinger.setAttribute('transform', 'rotate(0, 362, 326)');
    if (centerFinger) centerFinger.setAttribute('transform', 'translate(0, 0) scaleY(1)');
    if (glowCircle) glowCircle.style.opacity = '0';
    if (motorLight) motorLight.setAttribute('fill', '#FF1493');
}

// Move claw down during grab
async function moveClawDown() {
    const startY = gameState.clawY;
    const endY = Math.min(
        CONFIG.GLASS_BOX_TOP + CONFIG.GLASS_BOX_HEIGHT - CONFIG.PRIZE_RADIUS,
        startY + 130
    );

    while (gameState.clawY < endY) {
        gameState.clawY = Math.min(endY, gameState.clawY + CONFIG.CLAW_SPEED * 2);
        updateClawPosition();
        await wait(20);
    }
}

// Check if claw caught any prizes
async function checkPrizeCollision() {
    const clawRadius = CONFIG.CLAW_RADIUS;
    const catchCenterY = gameState.clawY + CONFIG.CLAW_CATCH_OFFSET_Y;
    let caughtCount = 0;

    for (const prize of gameState.prizes) {
        if (prize.caught) continue;

        const prizeEl = document.getElementById(`prize-${prize.id}`);
        if (!prizeEl) continue;

        const dx = gameState.clawX - prize.x;
        const dy = catchCenterY - prize.y;
        const distance = Math.hypot(dx, dy);

        if (distance < clawRadius + CONFIG.PRIZE_RADIUS * 0.9) {
            prize.caught = true;
            prizeEl.style.opacity = '0';
            prizeEl.style.pointerEvents = 'none';

            addCaughtPrize(prize);
            gameState.score += prize.points;
            gameState.tickets += Math.floor(prize.points / 5);

            if (prize.shiny) {
                gameState.lastShinyCatchAt = Date.now();
                // Shiny bonus is 10x current score (before shiny catch)
                const shinyBonus = gameState.score * 10;
                gameState.score += shinyBonus;
                gameState.tickets += Math.floor(shinyBonus / 5);
                showShinyCatchBurst(shinyBonus);
                showShinyCatchMessage(prize, shinyBonus);
                playSound('shiny');
            } else {
                playSound('catch');
            }

            updateUI();
            caughtCount += 1;
        }
    }

    return caughtCount;
}

// Add caught prize to display
function addCaughtPrize(prize) {
    const container = document.getElementById('caught-container');
    const caughtEl = document.createElement('div');
    caughtEl.className = 'caught-prize';
    if (prize.shiny) {
        caughtEl.classList.add('shiny-caught-prize', 'shiny-caught-pop');
    }

    const plushieSVGString = PlushieFactory.createPlushieSVG(
        PlushieFactory.getPrizeType(prize.emoji),
        96
    );
    caughtEl.innerHTML = plushieSVGString;
    caughtEl.style.display = 'flex';
    caughtEl.style.alignItems = 'center';
    caughtEl.style.justifyContent = 'center';

    container.appendChild(caughtEl);
    gameState.caughtPrizes.push(prize);

    // Check for new Plushiedex discovery
    const isNew = isNewPlushiedexEntry(prize);
    console.log('[PLUSHIEDEX]', prize.name, 'shiny=', prize.shiny, 'isNew=', isNew,
        'knownTypes=', [...gameState.plushiedexKnownTypes],
        'knownShinies=', [...gameState.plushiedexKnownShinies]);
    if (isNew) {
        prize.newPlushiedexEntry = true;
        markPlushiedexSeen(prize);
        showNewPlushiedexToast(prize);
        // Check if this completed the entire Plushiedex
        checkAndAwardPlushiedexCompletion();
    }

    if (prize.shiny) {
        setTimeout(() => {
            caughtEl.classList.remove('shiny-caught-pop');
        }, 900);
    }
}

// Move claw back up
async function moveClawUp() {
    while (gameState.clawY > CONFIG.CLAW_HOME_Y) {
        gameState.clawY = Math.max(CONFIG.CLAW_HOME_Y, gameState.clawY - CONFIG.CLAW_SPEED * 2);
        updateClawPosition();
        await wait(20);
    }
}

// Toggle button states
function toggleButtons(enabled) {
    document.querySelectorAll('.control-btn').forEach(btn => {
        if (btn.id === 'stats-btn' || btn.id === 'collection-btn' || btn.id === 'plushiedex-btn') return; // always enabled
        btn.disabled = !enabled;
        if (!enabled) btn.style.opacity = '0.5';
        else btn.style.opacity = '1';
    });
}

// End game
function endGame(isPerfect = false) {
    gameState.gameOver = true;
    gameState.isPerfectGame = isPerfect;
    toggleButtons(false);
    document.getElementById('reset-btn').disabled = false;

    // Token bonus: multiply final score by tokens³ (cubic scaling)
    const tokensLeft = gameState.tokens;
    let tokenBonus = 0;
    if (tokensLeft > 0 && gameState.score > 0) {
        const multiplier = Math.pow(tokensLeft, 3);
        tokenBonus = gameState.score * multiplier;
        gameState.score += tokenBonus;
        gameState.tickets += Math.floor(tokenBonus / 5);
        updateUI();
    }
    gameState.lastTokenBonus = tokenBonus;
    gameState.lastTokensLeft = tokensLeft;

    // Save game result to history
    GameHistory.save({
        date: new Date().toISOString(),
        score: gameState.score,
        tickets: gameState.tickets,
        plushiesCaught: gameState.caughtPrizes.length,
        shinyCaught: gameState.caughtPrizes.filter(p => p.shiny).length,
        isPerfectGame: isPerfect,
        tokensLeft,
        tokenBonus,
        prizes: gameState.caughtPrizes.map(p => ({ emoji: p.emoji, name: p.name, shiny: !!p.shiny, newPlushiedexEntry: !!p.newPlushiedexEntry })),
        plushiedexCompleted: !!gameState.plushiedexCompletionAwarded,
    });

    let message;
    if (isPerfect) {
        message = `🎊🎉 PERFECT GAME! 🎉🎊 All Plushies Caught! | Final Score: ${gameState.score.toLocaleString()} | Tickets Won: ${gameState.tickets.toLocaleString()}`;
    } else {
        message = `🎉 Game Over! Final Score: ${gameState.score.toLocaleString()} | Tickets Won: ${gameState.tickets.toLocaleString()}`;
        playSound('gameOver');
    }
    displayGameStatus(message);

    // Show the splash screen after a brief pause
    setTimeout(() => showSplashScreen(isPerfect), isPerfect ? 200 : 400);
}

function showSplashScreen(isPerfect) {
    const splash = document.getElementById('splash-screen');

    // Title
    document.getElementById('splash-title').textContent = isPerfect
        ? '🎊 PERFECT GAME! 🎊'
        : '🎉 Game Over! 🎉';

    // Stats
    document.getElementById('splash-score').textContent = gameState.score.toLocaleString();
    document.getElementById('splash-tickets').textContent = gameState.tickets.toLocaleString();
    document.getElementById('splash-count').textContent = gameState.caughtPrizes.length;

    // Perfect badge
    document.getElementById('splash-perfect-badge').style.display = isPerfect ? 'block' : 'none';

    // Token bonus badge
    const tokenBonusBadge = document.getElementById('splash-token-bonus');
    if (gameState.lastTokenBonus > 0) {
        const tokensLeft = gameState.lastTokensLeft;
        const multiplier = Math.pow(tokensLeft, 3);
        document.getElementById('splash-token-bonus-tokens').textContent = tokensLeft;
        document.getElementById('splash-token-bonus-multiplier').textContent = `×${multiplier.toLocaleString()}`;
        document.getElementById('splash-token-bonus-points').textContent = `+${gameState.lastTokenBonus.toLocaleString()}`;
        tokenBonusBadge.style.display = 'block';
    } else {
        tokenBonusBadge.style.display = 'none';
    }

    // Plushie collection grid
    const grid = document.getElementById('splash-plushies');
    const emptyMsg = document.getElementById('splash-empty');
    grid.innerHTML = '';

    if (gameState.caughtPrizes.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        gameState.caughtPrizes.forEach((prize, i) => {
            const item = document.createElement('div');
            item.className = 'splash-plushie-item';
            if (prize.shiny) item.classList.add('splash-shiny');
            if (prize.newPlushiedexEntry) item.classList.add('splash-new-dex');
            item.style.animationDelay = `${i * 0.06}s`;

            const svg = PlushieFactory.createPlushieSVG(
                PlushieFactory.getPrizeType(prize.emoji),
                60
            );

            const newBadge = prize.newPlushiedexEntry ? '<span class="plushiedex-new-badge">📖 NEW</span>' : '';

            item.innerHTML = `
                ${svg}
                ${newBadge}
                <div class="splash-plushie-name">${prize.shiny ? '✨ ' : ''}${prize.name}</div>
            `;
            grid.appendChild(item);
        });
    }

    // New Plushiedex entries summary
    renderNewDexSection(
        document.getElementById('splash-new-dex-section'),
        gameState.caughtPrizes.filter(p => p.newPlushiedexEntry)
    );

    // Plushiedex completion bonus badge
    const dexCompleteBadge = document.getElementById('splash-dex-complete');
    if (gameState.plushiedexCompletionAwarded) {
        dexCompleteBadge.style.display = 'block';
        document.getElementById('splash-dex-complete-amount').textContent =
            CONFIG.PLUSHIEDEX_COMPLETION_BONUS_TICKETS.toLocaleString();
    } else {
        dexCompleteBadge.style.display = 'none';
    }

    // Show/hide export button based on whether any plushies were caught
    const exportBtn = document.getElementById('splash-export-btn');
    exportBtn.style.display = gameState.caughtPrizes.length > 0 ? 'inline-block' : 'none';

    // Add kaomoji decorations to splash card
    populateKaomojiDecorations(document.querySelector('.splash-card'), 'splash-kaomoji');

    splash.style.display = 'flex';
}

function hideSplashScreen() {
    document.getElementById('splash-screen').style.display = 'none';
}

// Display status message
function displayGameStatus(message) {
    const statusEl = document.getElementById('game-status');
    statusEl.textContent = message;
}

function showBonusMessage(caughtCount, bonusPoints, bonusTokens) {
    const labelIndex = Math.min(caughtCount, CONFIG.MULTI_CATCH_LABELS.length - 1);
    const catchLabel = CONFIG.MULTI_CATCH_LABELS[labelIndex];
    const tokenPlural = bonusTokens === 1 ? '' : 's';

    const tokenLine = bonusTokens > 0
        ? `<div class="bonus-extra">+${bonusTokens} Bonus Token${tokenPlural}</div>`
        : '';

    const bonusCardHtml = `
        <div class="bonus-content multi-catch-${Math.min(caughtCount, 5)}">
            <div class="bonus-sparkle">${caughtCount >= 4 ? '💥' : '✨'}</div>
            <div class="bonus-text">${catchLabel}</div>
            <div class="bonus-amount">+${bonusPoints.toLocaleString()} Points</div>
            <div class="bonus-reason">${caughtCount} plushies in one grab!</div>
            ${tokenLine}
            <div class="bonus-sparkle">${caughtCount >= 4 ? '💥' : '✨'}</div>
        </div>
    `;

    const statusMsg = `🎉 ${catchLabel} +${bonusPoints.toLocaleString()} points${bonusTokens > 0 ? ` & +${bonusTokens} token${tokenPlural}` : ''}!`;

    const elapsedSinceShiny = Date.now() - gameState.lastShinyCatchAt;
    const delayMs = elapsedSinceShiny < CONFIG.SHINY_TO_BONUS_DELAY_MS
        ? CONFIG.SHINY_TO_BONUS_DELAY_MS - elapsedSinceShiny
        : 0;

    const showCard = () => {
        playSound('bonus');
        showBonusCard(
            bonusCardHtml,
            statusMsg,
            CONFIG.BONUS_DISPLAY_MS
        );
    };

    if (delayMs > 0) {
        gameState.bonusMessageTimeoutId = setTimeout(showCard, delayMs);
        return;
    }

    showCard();
}

function showPerfectGameBonus() {
    // Award massive quadratic bonus: flat base + score² / 100
    const quadraticBonus = Math.floor(gameState.score * gameState.score / 100);
    const perfectBonus = CONFIG.PERFECT_GAME_BONUS + quadraticBonus;
    gameState.score += perfectBonus;
    gameState.tickets += Math.floor(perfectBonus / 5);
    updateUI();
    playSound('perfect');

    const perfectCardHtml = `
        <div class="bonus-content perfect-game">
            <div class="bonus-sparkle">🎊</div>
            <div class="bonus-text">PERFECT GAME!</div>
            <div class="bonus-amount perfect">+${perfectBonus.toLocaleString()} POINTS</div>
            <div class="bonus-reason">ALL PLUSHIES CAUGHT!</div>
            <div class="bonus-sparkle">🎊</div>
        </div>
    `;

    showBonusCard(
        perfectCardHtml,
        `🎊🎉 PERFECT GAME! +${perfectBonus.toLocaleString()} BONUS POINTS! 🎉🎊`,
        CONFIG.PERFECT_BONUS_DISPLAY_MS
    );
}

function showShinyCatchMessage(prize, shinyBonus) {
    const shinyCardHtml = `
        <div class="bonus-content shiny-catch">
            <div class="bonus-sparkle">✨</div>
            <div class="bonus-text">SHINY CATCH!</div>
            <div class="bonus-amount perfect">+${shinyBonus.toLocaleString()} POINTS</div>
            <div class="bonus-reason">${prize.name} (Rare Variant) × 10</div>
            <div class="bonus-sparkle">✨</div>
        </div>
    `;

    showBonusCard(
        shinyCardHtml,
        `✨ SHINY BONUS! +${shinyBonus.toLocaleString()} points for ${prize.name}!`,
        CONFIG.BONUS_DISPLAY_MS
    );
}

// Clear status message
function clearGameStatus() {
    document.getElementById('game-status').textContent = '';
}

// Utility wait function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate Report Card (mirrors splash screen content for PNG export)
function generateReportCard() {
    // Title
    document.getElementById('report-title').textContent = gameState.isPerfectGame
        ? '🎊 PERFECT GAME! 🎊'
        : '🎉 Game Over! 🎉';

    // Stats
    document.getElementById('report-score').textContent = gameState.score.toLocaleString();
    document.getElementById('report-tickets').textContent = gameState.tickets.toLocaleString();
    document.getElementById('report-count').textContent = gameState.caughtPrizes.length;

    // Perfect badge
    document.getElementById('report-perfect-badge').style.display =
        gameState.isPerfectGame ? 'block' : 'none';

    // Token bonus
    const tokenBonusEl = document.getElementById('report-token-bonus');
    if (gameState.lastTokenBonus > 0) {
        const tokensLeft = gameState.lastTokensLeft;
        const multiplier = Math.pow(tokensLeft, 3);
        document.getElementById('report-token-bonus-tokens').textContent = tokensLeft;
        document.getElementById('report-token-bonus-multiplier').textContent = `×${multiplier.toLocaleString()}`;
        document.getElementById('report-token-bonus-points').textContent = `+${gameState.lastTokenBonus.toLocaleString()}`;
        tokenBonusEl.style.display = 'block';
    } else {
        tokenBonusEl.style.display = 'none';
    }

    // Plushies grid
    const plushiesGrid = document.getElementById('report-plushies');
    plushiesGrid.innerHTML = '';

    gameState.caughtPrizes.forEach(prize => {
        const plushieItem = document.createElement('div');
        plushieItem.className = 'report-plushie-item';
        if (prize.shiny) {
            plushieItem.classList.add('report-shiny-plushie');
        }
        if (prize.newPlushiedexEntry) {
            plushieItem.classList.add('report-new-dex');
        }

        const plushieSVG = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(prize.emoji),
            70
        );

        const newBadge = prize.newPlushiedexEntry ? '<span class="plushiedex-new-badge report-new-badge">📖 NEW</span>' : '';

        plushieItem.innerHTML = `
            ${plushieSVG}
            ${newBadge}
            <div class="report-plushie-name">${prize.shiny ? '✨ ' : ''}${prize.name}</div>
        `;

        plushiesGrid.appendChild(plushieItem);
    });

    // New Plushiedex entries summary
    renderNewDexSection(
        document.getElementById('report-new-dex-section'),
        gameState.caughtPrizes.filter(p => p.newPlushiedexEntry)
    );

    // Plushiedex completion bonus badge
    const reportDexComplete = document.getElementById('report-dex-complete');
    if (gameState.plushiedexCompletionAwarded) {
        reportDexComplete.style.display = 'block';
        document.getElementById('report-dex-complete-amount').textContent =
            CONFIG.PLUSHIEDEX_COMPLETION_BONUS_TICKETS.toLocaleString();
    } else {
        reportDexComplete.style.display = 'none';
    }

    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('report-date').textContent = dateStr;

    // Add kaomoji decorations to report card
    populateKaomojiDecorations(document.querySelector('.report-card-content'), 'report-kaomoji');
}

// Generate Report Card from a saved history record
function generateReportCardFromRecord(record) {
    document.getElementById('report-title').textContent = record.isPerfectGame
        ? '🎊 PERFECT GAME! 🎊'
        : '🎉 Game Over! 🎉';

    document.getElementById('report-score').textContent = record.score.toLocaleString();
    document.getElementById('report-tickets').textContent = record.tickets.toLocaleString();
    document.getElementById('report-count').textContent = record.plushiesCaught;

    document.getElementById('report-perfect-badge').style.display =
        record.isPerfectGame ? 'block' : 'none';

    const tokenBonusEl = document.getElementById('report-token-bonus');
    if (record.tokenBonus > 0) {
        const multiplier = Math.pow(record.tokensLeft, 3);
        document.getElementById('report-token-bonus-tokens').textContent = record.tokensLeft;
        document.getElementById('report-token-bonus-multiplier').textContent = `×${multiplier.toLocaleString()}`;
        document.getElementById('report-token-bonus-points').textContent = `+${record.tokenBonus.toLocaleString()}`;
        tokenBonusEl.style.display = 'block';
    } else {
        tokenBonusEl.style.display = 'none';
    }

    const plushiesGrid = document.getElementById('report-plushies');
    plushiesGrid.innerHTML = '';

    if (record.prizes && record.prizes.length > 0) {
        record.prizes.forEach(prize => {
            const plushieItem = document.createElement('div');
            plushieItem.className = 'report-plushie-item';
            if (prize.shiny) plushieItem.classList.add('report-shiny-plushie');
            if (prize.newPlushiedexEntry) plushieItem.classList.add('report-new-dex');

            const plushieSVG = PlushieFactory.createPlushieSVG(
                PlushieFactory.getPrizeType(prize.emoji), 70
            );
            const newBadge = prize.newPlushiedexEntry ? '<span class="plushiedex-new-badge report-new-badge">📖 NEW</span>' : '';
            plushieItem.innerHTML = `
                ${plushieSVG}
                ${newBadge}
                <div class="report-plushie-name">${prize.shiny ? '✨ ' : ''}${prize.name}</div>
            `;
            plushiesGrid.appendChild(plushieItem);
        });
    }

    // New Plushiedex entries summary
    const newEntries = (record.prizes || []).filter(p => p.newPlushiedexEntry);
    renderNewDexSection(
        document.getElementById('report-new-dex-section'),
        newEntries
    );

    // Plushiedex completion bonus badge
    const reportDexComplete = document.getElementById('report-dex-complete');
    if (record.plushiedexCompleted) {
        reportDexComplete.style.display = 'block';
        document.getElementById('report-dex-complete-amount').textContent =
            CONFIG.PLUSHIEDEX_COMPLETION_BONUS_TICKETS.toLocaleString();
    } else {
        reportDexComplete.style.display = 'none';
    }

    const d = new Date(record.date);
    document.getElementById('report-date').textContent = d.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    populateKaomojiDecorations(document.querySelector('.report-card-content'), 'report-kaomoji');
}

// Export a report card from a history record by index
async function exportHistoryReportCard(historyIndex, btnEl) {
    const history = GameHistory.getAll();
    const record = history[historyIndex];
    if (!record) return;

    const originalText = btnEl.textContent;
    try {
        btnEl.disabled = true;
        btnEl.textContent = '⏳';

        generateReportCardFromRecord(record);

        const reportCard = document.getElementById('report-card');
        reportCard.style.display = 'block';
        reportCard.style.position = 'fixed';
        reportCard.style.left = '-9999px';

        await wait(100);

        const canvas = await html2canvas(reportCard, {
            backgroundColor: '#0a0015',
            scale: 2,
            logging: false,
            useCORS: true
        });

        reportCard.style.display = 'none';

        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date(record.date).getTime();
            link.download = `kawaii-plushie-report-${timestamp}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            btnEl.textContent = '✅';
            setTimeout(() => {
                btnEl.textContent = originalText;
                btnEl.disabled = false;
            }, 1500);
        });
    } catch (error) {
        btnEl.textContent = '❌';
        setTimeout(() => {
            btnEl.textContent = originalText;
            btnEl.disabled = false;
        }, 1500);
    }
}

// Export Report Card as PNG
async function exportReportCard(triggerBtn) {
    const exportBtn = triggerBtn instanceof HTMLElement
        ? triggerBtn
        : document.getElementById('splash-export-btn');
    const originalText = exportBtn.textContent;

    try {
        // Disable button and show loading state
        exportBtn.disabled = true;
        exportBtn.textContent = '⏳ Generating...';

        // Generate report card content
        generateReportCard();

        // Show report card temporarily
        const reportCard = document.getElementById('report-card');
        reportCard.style.display = 'block';
        reportCard.style.position = 'fixed';
        reportCard.style.left = '-9999px';

        // Wait for fonts and SVGs to load
        await wait(100);

        // Capture the report card
        const canvas = await html2canvas(reportCard, {
            backgroundColor: '#0a0015',
            scale: 2,
            logging: false,
            useCORS: true
        });

        // Hide report card
        reportCard.style.display = 'none';

        // Convert to blob and download
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().getTime();
            link.download = `kawaii-plushie-report-${timestamp}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            // Reset button
            exportBtn.textContent = '✅ Downloaded!';
            setTimeout(() => {
                exportBtn.textContent = originalText;
                exportBtn.disabled = false;
            }, 2000);
        });

    } catch (error) {
        console.error('Export failed:', error);
        exportBtn.textContent = '❌ Export Failed';
        setTimeout(() => {
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
        }, 2000);
    }
}

// ===== Stats Modal =====
let statsSortField = 'score';
let statsSortAsc = false; // descending by default

// ===== Plushie Collection Modal =====

function openCollectionModal() {
    const overlay = document.getElementById('collection-overlay');
    renderCollectionModal();
    overlay.style.display = 'flex';
}

function closeCollectionModal() {
    document.getElementById('collection-overlay').style.display = 'none';
}

function renderCollectionModal() {
    const history = GameHistory.getAll();
    const grid = document.getElementById('collection-grid');
    const emptyMsg = document.getElementById('collection-empty');
    const totalEl = document.getElementById('collection-total');

    // Aggregate all plushies from all games, keyed by name + shiny status
    const plushieMap = new Map();
    let totalCount = 0;

    history.forEach(record => {
        if (!record.prizes) return;
        record.prizes.forEach(p => {
            const key = `${p.emoji}|${p.name}|${p.shiny ? 'shiny' : 'normal'}`;
            if (!plushieMap.has(key)) {
                plushieMap.set(key, { emoji: p.emoji, name: p.name, shiny: !!p.shiny, count: 0 });
            }
            plushieMap.get(key).count++;
            totalCount++;
        });
    });

    grid.innerHTML = '';

    if (plushieMap.size === 0) {
        emptyMsg.style.display = 'block';
        totalEl.textContent = '';
        return;
    }

    emptyMsg.style.display = 'none';
    totalEl.textContent = `${totalCount.toLocaleString()} plushie${totalCount !== 1 ? 's' : ''} collected across ${history.length} game${history.length !== 1 ? 's' : ''}`;

    // Sort: shinies first, then by count descending, then by name
    const sorted = [...plushieMap.values()].sort((a, b) => {
        if (a.shiny !== b.shiny) return a.shiny ? -1 : 1;
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
    });

    sorted.forEach((entry, i) => {
        const item = document.createElement('div');
        item.className = 'collection-item';
        if (entry.shiny) item.classList.add('collection-shiny');
        item.style.animationDelay = `${i * 0.04}s`;

        const svg = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(entry.emoji),
            90
        );

        const countBadge = entry.count > 1
            ? `<div class="collection-count">×${entry.count}</div>`
            : '';

        item.innerHTML = `
            <div class="collection-item-svg">${svg}</div>
            ${countBadge}
            <div class="collection-item-name">${entry.shiny ? '✨ ' : ''}${entry.name}</div>
        `;

        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openPlushieDetail(entry));

        grid.appendChild(item);
    });
}

function openPlushiedex() {
    renderPlushiedex();
    document.getElementById('plushiedex-overlay').style.display = 'flex';
}

function closePlushiedex() {
    document.getElementById('plushiedex-overlay').style.display = 'none';
}

function renderPlushiedex() {
    const history = GameHistory.getAll();
    const totalTypes = CONFIG.PRIZE_TYPES.length;

    const caughtTypes = new Set();
    const caughtShinies = new Set();
    history.forEach(record => {
        if (!record.prizes) return;
        record.prizes.forEach(p => {
            if (p.shiny) {
                caughtShinies.add(p.emoji);
            } else {
                caughtTypes.add(p.emoji);
            }
        });
    });

    const typesFound = caughtTypes.size;
    const shiniesFound = caughtShinies.size;

    const typesBar = document.getElementById('plushiedex-bar-types');
    const shinyBar = document.getElementById('plushiedex-bar-shiny');
    const typesText = document.getElementById('plushiedex-types-text');
    const shinyText = document.getElementById('plushiedex-shiny-text');

    typesBar.style.width = `${(typesFound / totalTypes) * 100}%`;
    shinyBar.style.width = `${(shiniesFound / totalTypes) * 100}%`;
    typesText.textContent = `${typesFound}/${totalTypes}`;
    shinyText.textContent = `${shiniesFound}/${totalTypes}`;

    typesBar.classList.toggle('plushiedex-bar-complete', typesFound === totalTypes);
    shinyBar.classList.toggle('plushiedex-bar-complete', shiniesFound === totalTypes);

    const roster = document.getElementById('plushiedex-roster');
    roster.innerHTML = '';

    CONFIG.PRIZE_TYPES.forEach(prizeType => {
        const found = caughtTypes.has(prizeType.emoji);
        const shinyFound = caughtShinies.has(prizeType.emoji);

        const slot = document.createElement('div');
        slot.className = 'plushiedex-slot';
        if (!found) slot.classList.add('plushiedex-slot-missing');

        const svg = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(prizeType.emoji),
            72
        );

        let badges = '';
        if (found) badges += '<span class="plushiedex-slot-check">✓</span>';
        if (shinyFound) badges += '<span class="plushiedex-slot-shiny-badge">✨</span>';

        slot.innerHTML = `
            <div class="plushiedex-slot-svg">${svg}</div>
            ${badges}
            <div class="plushiedex-slot-name">${found ? prizeType.name : '???'}</div>
        `;

        // Make found slots clickable to open detail
        if (found) {
            // Count total catches for this type (normal)
            let normalCount = 0;
            history.forEach(record => {
                if (!record.prizes) return;
                record.prizes.forEach(p => {
                    if (p.emoji === prizeType.emoji && !p.shiny) normalCount++;
                });
            });
            slot.addEventListener('click', () => openPlushieDetail({
                emoji: prizeType.emoji,
                name: prizeType.name,
                shiny: false,
                count: normalCount
            }));
        }

        roster.appendChild(slot);
    });

    // Missing section
    const missingSection = document.getElementById('plushiedex-missing');
    const missingList = document.getElementById('plushiedex-missing-list');
    const completeMsg = document.getElementById('plushiedex-complete');

    const missingTypes = CONFIG.PRIZE_TYPES.filter(t => !caughtTypes.has(t.emoji));
    const missingShinies = CONFIG.PRIZE_TYPES.filter(t => !caughtShinies.has(t.emoji));

    if (missingTypes.length === 0 && missingShinies.length === 0) {
        // Full completion!
        missingSection.style.display = 'none';
        completeMsg.style.display = 'block';
    } else if (missingTypes.length === 0 && missingShinies.length > 0) {
        // All types found, only missing shinies
        missingSection.style.display = 'block';
        completeMsg.style.display = 'none';
        missingList.innerHTML = '';

        const shinyHeader = document.createElement('div');
        shinyHeader.className = 'plushiedex-missing-subtitle';
        shinyHeader.textContent = `✨ ${missingShinies.length} shiny variant${missingShinies.length !== 1 ? 's' : ''} to find`;
        missingList.appendChild(shinyHeader);

        const shinyRow = document.createElement('div');
        shinyRow.className = 'plushiedex-missing-row';
        missingShinies.forEach(t => {
            const chip = document.createElement('div');
            chip.className = 'plushiedex-missing-chip plushiedex-missing-chip-shiny';
            const svg = PlushieFactory.createPlushieSVG(PlushieFactory.getPrizeType(t.emoji), 32);
            chip.innerHTML = `<span class="plushiedex-missing-chip-svg">${svg}</span><span>✨ ${t.name}</span>`;
            shinyRow.appendChild(chip);
        });
        missingList.appendChild(shinyRow);
    } else {
        missingSection.style.display = 'block';
        completeMsg.style.display = 'none';
        missingList.innerHTML = '';

        // Missing normal types
        const typeHeader = document.createElement('div');
        typeHeader.className = 'plushiedex-missing-subtitle';
        typeHeader.textContent = `${missingTypes.length} type${missingTypes.length !== 1 ? 's' : ''} not yet caught`;
        missingList.appendChild(typeHeader);

        const typeRow = document.createElement('div');
        typeRow.className = 'plushiedex-missing-row';
        missingTypes.forEach(t => {
            const chip = document.createElement('div');
            chip.className = 'plushiedex-missing-chip';
            const svg = PlushieFactory.createPlushieSVG(PlushieFactory.getPrizeType(t.emoji), 32);
            chip.innerHTML = `<span class="plushiedex-missing-chip-svg">${svg}</span><span>???</span>`;
            typeRow.appendChild(chip);
        });
        missingList.appendChild(typeRow);

        // Missing shinies
        if (missingShinies.length > 0) {
            const shinyHeader = document.createElement('div');
            shinyHeader.className = 'plushiedex-missing-subtitle';
            shinyHeader.textContent = `✨ ${missingShinies.length} shiny variant${missingShinies.length !== 1 ? 's' : ''} to find`;
            missingList.appendChild(shinyHeader);

            const shinyRow = document.createElement('div');
            shinyRow.className = 'plushiedex-missing-row';
            missingShinies.forEach(t => {
                const chip = document.createElement('div');
                chip.className = 'plushiedex-missing-chip plushiedex-missing-chip-shiny';
                const found = caughtTypes.has(t.emoji);
                const svg = PlushieFactory.createPlushieSVG(PlushieFactory.getPrizeType(t.emoji), 32);
                chip.innerHTML = `<span class="plushiedex-missing-chip-svg">${svg}</span><span>✨ ${found ? t.name : '???'}</span>`;
                shinyRow.appendChild(chip);
            });
            missingList.appendChild(shinyRow);
        }
    }
}

// ===== Plushie Detail Overlay =====

function openPlushieDetail(entry) {
    const overlay = document.getElementById('plushie-detail-overlay');
    const svgContainer = document.getElementById('plushie-detail-svg');
    const nameEl = document.getElementById('plushie-detail-name');
    const badgesEl = document.getElementById('plushie-detail-badges');
    const statsEl = document.getElementById('plushie-detail-stats');
    const spotlight = document.getElementById('plushie-detail-spotlight');

    // Big SVG render
    const bigSvg = PlushieFactory.createPlushieSVG(
        PlushieFactory.getPrizeType(entry.emoji),
        220
    );
    svgContainer.innerHTML = bigSvg;

    // Name
    nameEl.textContent = entry.name;

    // Shiny class on card
    const card = overlay.querySelector('.plushie-detail-card');
    card.classList.toggle('plushie-detail-shiny', !!entry.shiny);

    // Spotlight color
    if (entry.shiny) {
        spotlight.style.background = 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.03) 50%, transparent 70%)';
    } else {
        spotlight.style.background = 'radial-gradient(circle, rgba(255,20,147,0.08) 0%, rgba(255,20,147,0.02) 50%, transparent 70%)';
    }

    // Badges
    const prizeConfig = CONFIG.PRIZE_TYPES.find(t => t.emoji === entry.emoji);
    const points = prizeConfig ? prizeConfig.points : '?';

    let badgesHTML = '';
    if (entry.shiny) {
        badgesHTML += `<span class="plushie-detail-badge plushie-detail-badge-shiny">✨ Shiny</span>`;
    }
    badgesHTML += `<span class="plushie-detail-badge plushie-detail-badge-points">${entry.emoji} ${points} pts</span>`;
    if (entry.shiny) {
        badgesHTML += `<span class="plushie-detail-badge plushie-detail-badge-shiny-pts">✨ ${points * 10} pts when shiny</span>`;
    }
    badgesEl.innerHTML = badgesHTML;

    // Personality
    const plushieType = PlushieFactory.getPrizeType(entry.emoji);
    const personality = PLUSHIE_PERSONALITIES[plushieType] || 'Personality pending!! >_<';
    const personalityEl = document.getElementById('plushie-detail-personality');
    if (personalityEl) {
        personalityEl.textContent = personality;
    }

    // Stats
    let statsHTML = `
        <div class="plushie-detail-stat">
            <span class="plushie-detail-stat-label">Times Caught</span>
            <span class="plushie-detail-stat-value">${entry.count.toLocaleString()}</span>
        </div>
    `;

    // Find first & last catch dates
    const history = GameHistory.getAll();
    let firstCatchDate = null;
    let lastCatchDate = null;
    history.forEach(record => {
        if (!record.prizes) return;
        const hasThis = record.prizes.some(p =>
            p.emoji === entry.emoji && p.name === entry.name && !!p.shiny === !!entry.shiny
        );
        if (hasThis) {
            const d = new Date(record.date);
            if (!firstCatchDate || d < firstCatchDate) firstCatchDate = d;
            if (!lastCatchDate || d > lastCatchDate) lastCatchDate = d;
        }
    });

    if (firstCatchDate) {
        const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        statsHTML += `
            <div class="plushie-detail-stat">
                <span class="plushie-detail-stat-label">First Caught</span>
                <span class="plushie-detail-stat-value">${fmt(firstCatchDate)}</span>
            </div>
        `;
        if (lastCatchDate && lastCatchDate.getTime() !== firstCatchDate.getTime()) {
            statsHTML += `
                <div class="plushie-detail-stat">
                    <span class="plushie-detail-stat-label">Last Caught</span>
                    <span class="plushie-detail-stat-value">${fmt(lastCatchDate)}</span>
                </div>
            `;
        }
    }

    statsEl.innerHTML = statsHTML;

    overlay.style.display = 'flex';
    playSound('catch');
}

function closePlushieDetail() {
    document.getElementById('plushie-detail-overlay').style.display = 'none';
}

function exportPlushieAsPNG() {
    const card = document.querySelector('.plushie-detail-card');
    const svgEl = document.querySelector('#plushie-detail-svg svg');
    const name = document.getElementById('plushie-detail-name').textContent;
    const personality = document.getElementById('plushie-detail-personality').textContent;
    const isShiny = card.classList.contains('plushie-detail-shiny');
    const badges = Array.from(document.querySelectorAll('#plushie-detail-badges .plushie-detail-badge'))
        .map(b => b.textContent.trim());
    const stats = Array.from(document.querySelectorAll('#plushie-detail-stats .plushie-detail-stat'))
        .map(s => {
            const label = s.querySelector('.plushie-detail-stat-label').textContent;
            const value = s.querySelector('.plushie-detail-stat-value').textContent;
            return { label, value };
        });

    const scale = 2;
    const W = 460 * scale;
    const pad = 30 * scale;       // horizontal padding
    const contentW = W - pad * 2; // usable content width

    // --- Pre-calculate heights with a temporary canvas for text measurement ---
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = W;
    tmpCanvas.height = 100;
    const tmp = tmpCanvas.getContext('2d');

    // Plushie image
    const imgSize = 200 * scale;
    const imgTopPad = 36 * scale;

    // Name
    const nameSize = 22 * scale;
    const nameGap = 14 * scale;

    // Badges — measure and compute rows
    const badgeFontSize = 10 * scale;
    tmp.font = `900 ${badgeFontSize}px 'Courier New', monospace`;
    const badgePadX = 14 * scale;
    const badgeH = 24 * scale;
    const badgeGapX = 8 * scale;
    const badgeGapY = 8 * scale;

    const badgeMeasured = badges.map(b => ({
        text: b,
        width: tmp.measureText(b).width + badgePadX * 2
    }));

    // Lay badges into rows
    const badgeRows = [];
    let currentRow = [];
    let currentRowW = 0;
    badgeMeasured.forEach(b => {
        const needed = b.width + (currentRow.length > 0 ? badgeGapX : 0);
        if (currentRow.length > 0 && currentRowW + needed > contentW) {
            badgeRows.push(currentRow);
            currentRow = [b];
            currentRowW = b.width;
        } else {
            currentRow.push(b);
            currentRowW += needed;
        }
    });
    if (currentRow.length) badgeRows.push(currentRow);
    const badgesBlockH = badgeRows.length * (badgeH + badgeGapY);
    const badgesGap = 14 * scale;

    // Personality — wrap lines
    const pFontSize = 11 * scale;
    const pLineH = 18 * scale;
    const pPadY = 12 * scale;
    tmp.font = `italic ${pFontSize}px sans-serif`;
    const personalityLines = wrapText(tmp, personality, contentW - 24 * scale);
    const pBlockH = personalityLines.length * pLineH + pPadY * 2;
    const pGap = 14 * scale;

    // Stats
    const statRowH = 26 * scale;
    const statPadY = 12 * scale;
    const statBlockH = stats.length * statRowH + statPadY * 2;
    const statGap = 14 * scale;

    // Watermark
    const watermarkH = 28 * scale;

    // Total height
    const H = imgTopPad + imgSize + nameGap + nameSize + nameGap
        + badgesBlockH + badgesGap
        + pBlockH + pGap
        + statBlockH + statGap
        + watermarkH;

    // --- Create final canvas ---
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // --- Background ---
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0f0020');
    grad.addColorStop(0.5, '#1a0033');
    grad.addColorStop(1, '#150028');
    ctx.fillStyle = grad;
    roundRect(ctx, 0, 0, W, H, 28 * scale);
    ctx.fill();

    // Clip to rounded rect so nothing bleeds
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28 * scale);
    ctx.clip();

    // Border
    ctx.strokeStyle = isShiny ? '#FFD700' : '#FF1493';
    ctx.lineWidth = 4 * scale;
    roundRect(ctx, 2 * scale, 2 * scale, W - 4 * scale, H - 4 * scale, 26 * scale);
    ctx.stroke();

    // Spotlight glow
    const spotGrad = ctx.createRadialGradient(W / 2, imgTopPad + imgSize * 0.4, 0, W / 2, imgTopPad + imgSize * 0.4, imgSize * 0.8);
    if (isShiny) {
        spotGrad.addColorStop(0, 'rgba(255,215,0,0.14)');
        spotGrad.addColorStop(0.6, 'rgba(255,215,0,0.03)');
    } else {
        spotGrad.addColorStop(0, 'rgba(255,20,147,0.10)');
        spotGrad.addColorStop(0.6, 'rgba(255,20,147,0.02)');
    }
    spotGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, W, H);

    // --- Render SVG to image, then draw everything else ---
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
        // Draw plushie SVG centered
        const imgX = (W - imgSize) / 2;
        const imgY = imgTopPad;
        ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        URL.revokeObjectURL(url);

        let curY = imgY + imgSize + nameGap;

        // --- Name ---
        ctx.font = `900 ${nameSize}px 'Courier New', monospace`;
        ctx.fillStyle = isShiny ? '#FFD700' : '#FF1493';
        ctx.textAlign = 'center';
        ctx.shadowColor = isShiny ? 'rgba(255,215,0,0.5)' : 'rgba(255,20,147,0.5)';
        ctx.shadowBlur = 12 * scale;
        ctx.fillText(name, W / 2, curY + nameSize * 0.8);
        ctx.shadowBlur = 0;
        curY += nameSize + nameGap;

        // --- Badges (row-wrapped, centered) ---
        ctx.font = `900 ${badgeFontSize}px 'Courier New', monospace`;
        ctx.textBaseline = 'middle';
        badgeRows.forEach(row => {
            const rowW = row.reduce((s, b) => s + b.width, 0) + (row.length - 1) * badgeGapX;
            let bx = (W - rowW) / 2;
            row.forEach(badge => {
                const isShinyBadge = badge.text.includes('Shiny');
                // Badge background
                ctx.fillStyle = isShinyBadge ? 'rgba(255,215,0,0.15)' : 'rgba(255,20,147,0.15)';
                ctx.strokeStyle = isShinyBadge ? 'rgba(255,215,0,0.5)' : 'rgba(255,20,147,0.4)';
                ctx.lineWidth = 1.5 * scale;
                roundRect(ctx, bx, curY, badge.width, badgeH, 12 * scale);
                ctx.fill();
                ctx.stroke();
                // Badge text
                ctx.fillStyle = isShinyBadge ? '#FFD700' : '#FFB6E1';
                ctx.textAlign = 'center';
                ctx.fillText(badge.text, bx + badge.width / 2, curY + badgeH / 2 + 1 * scale);
                bx += badge.width + badgeGapX;
            });
            curY += badgeH + badgeGapY;
        });
        ctx.textBaseline = 'alphabetic';
        curY += badgesGap - badgeGapY; // remove last row gap, add section gap

        // --- Personality ---
        ctx.fillStyle = isShiny ? 'rgba(255,215,0,0.08)' : 'rgba(255,20,147,0.08)';
        ctx.strokeStyle = isShiny ? 'rgba(255,215,0,0.2)' : 'rgba(255,20,147,0.2)';
        ctx.lineWidth = 1.5 * scale;
        roundRect(ctx, pad, curY, contentW, pBlockH, 12 * scale);
        ctx.fill();
        ctx.stroke();

        ctx.font = `italic ${pFontSize}px sans-serif`;
        ctx.fillStyle = isShiny ? '#FFD700' : '#FFB6E1';
        ctx.textAlign = 'center';
        personalityLines.forEach((line, i) => {
            ctx.fillText(line, W / 2, curY + pPadY + pLineH * 0.7 + i * pLineH);
        });
        curY += pBlockH + pGap;

        // --- Stats ---
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.strokeStyle = 'rgba(0,255,255,0.12)';
        ctx.lineWidth = 1.5 * scale;
        roundRect(ctx, pad, curY, contentW, statBlockH, 12 * scale);
        ctx.fill();
        ctx.stroke();

        stats.forEach((s, i) => {
            const sy = curY + statPadY + statRowH * 0.65 + i * statRowH;
            ctx.textAlign = 'left';
            ctx.font = `bold ${9 * scale}px 'Courier New', monospace`;
            ctx.fillStyle = 'rgba(0,255,255,0.8)';
            ctx.fillText(s.label.toUpperCase(), pad + 14 * scale, sy);
            ctx.textAlign = 'right';
            ctx.font = `900 ${12 * scale}px 'Courier New', monospace`;
            ctx.fillStyle = '#FFD700';
            ctx.fillText(s.value, W - pad - 14 * scale, sy);
        });
        curY += statBlockH + statGap;

        // --- Watermark ---
        ctx.textAlign = 'center';
        ctx.font = `${8 * scale}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillText('✨ Kawaii Claw Machine ✨', W / 2, curY + 8 * scale);

        ctx.restore(); // release clip

        // --- Download ---
        const link = document.createElement('a');
        link.download = `${name.replace(/\s+/g, '_')}${isShiny ? '_shiny' : ''}_plushie.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    img.onerror = () => {
        URL.revokeObjectURL(url);
        alert('Could not export plushie. Please try again!');
    };

    img.src = url;
}

// Helper: rounded rectangle path
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// Helper: wrap text into lines
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > maxWidth) {
            if (line) lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function openStatsModal() {
    const overlay = document.getElementById('stats-overlay');
    renderStatsModal();
    overlay.style.display = 'flex';
}

function closeStatsModal() {
    document.getElementById('stats-overlay').style.display = 'none';
}

function renderStatsModal() {
    const stats = GameHistory.getLifetimeStats();
    const history = GameHistory.getAll();

    // Lifetime stats
    document.getElementById('stats-total-games').textContent = stats.totalGames.toLocaleString();
    document.getElementById('stats-lifetime-score').textContent = stats.lifetimeScore.toLocaleString();
    document.getElementById('stats-lifetime-tickets').textContent = stats.lifetimeTickets.toLocaleString();
    document.getElementById('stats-total-plushies').textContent = stats.totalPlushies.toLocaleString();
    document.getElementById('stats-total-shinies').textContent = stats.totalShinies.toLocaleString();
    document.getElementById('stats-perfect-games').textContent = stats.perfectGames.toLocaleString();
    document.getElementById('stats-best-score').textContent = stats.bestScore.toLocaleString();

    // Sort history (keep original index for export)
    const indexed = history.map((r, i) => ({ ...r, _idx: i }));
    const sorted = indexed.sort((a, b) => {
        let va, vb;
        if (statsSortField === 'date') {
            va = new Date(a.date).getTime();
            vb = new Date(b.date).getTime();
        } else {
            va = a[statsSortField] ?? 0;
            vb = b[statsSortField] ?? 0;
        }
        return statsSortAsc ? va - vb : vb - va;
    });

    // Update sort indicators
    document.querySelectorAll('.stats-th-sort').forEach(th => {
        const field = th.dataset.sort;
        const arrow = th.querySelector('.sort-arrow');
        if (field === statsSortField) {
            th.classList.add('active-sort');
            arrow.textContent = statsSortAsc ? ' ▲' : ' ▼';
        } else {
            th.classList.remove('active-sort');
            arrow.textContent = '';
        }
    });

    // Render table
    const tbody = document.getElementById('stats-history-body');
    const emptyMsg = document.getElementById('stats-empty');

    if (sorted.length === 0) {
        tbody.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';
    tbody.innerHTML = sorted.map(r => {
        const d = new Date(r.date);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const perfectClass = r.isPerfectGame ? 'stats-row-perfect' : '';
        const perfectBadge = r.isPerfectGame ? ' ⭐' : '';
        const shinyBadge = r.shinyCaught > 0 ? ` ✨${r.shinyCaught}` : '';
        const hasPrizes = r.prizes && r.prizes.length > 0;
        const exportTitle = hasPrizes ? 'Export report card' : 'Export report card (no plushie data for old games)';
        const tokensLeftVal = r.tokensLeft != null ? r.tokensLeft : '—';
        return `<tr class="${perfectClass}">
            <td>${dateStr}<br><span class="stats-time">${timeStr}</span></td>
            <td class="stats-score-col">${r.score.toLocaleString()}${perfectBadge}</td>
            <td>${r.tickets.toLocaleString()}</td>
            <td>${r.plushiesCaught}${shinyBadge}</td>
            <td>${tokensLeftVal}</td>
            <td class="stats-export-col"><button class="stats-row-export-btn" title="${exportTitle}" onclick="exportHistoryReportCard(${r._idx}, this)">📸</button></td>
        </tr>`;
    }).join('');
}

function handleStatsSort(field) {
    if (statsSortField === field) {
        statsSortAsc = !statsSortAsc;
    } else {
        statsSortField = field;
        statsSortAsc = false;
    }
    renderStatsModal();
}

function exportStatsPDF() {
    const btn = document.getElementById('stats-export-pdf-btn');
    const origText = btn.textContent;
    btn.textContent = '⏳ Generating…';
    btn.disabled = true;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margin = 40;
        const contentW = pageW - margin * 2;

        // ─── Color palette ───
        const bg       = [15, 0, 32];       // #0f0020
        const pink     = [255, 20, 147];    // #FF1493
        const cyan     = [0, 255, 255];     // #00FFFF
        const softPink = [255, 182, 225];   // #FFB6E1
        const gold     = [255, 215, 0];     // #FFD700
        const dimCyan  = [103, 232, 249];   // #67E8F9
        const white    = [255, 255, 255];

        // ─── Helpers ───
        function fillPage() {
            doc.setFillColor(...bg);
            doc.rect(0, 0, pageW, pageH, 'F');
        }

        function drawPageBorder() {
            doc.setDrawColor(...cyan);
            doc.setLineWidth(1.5);
            doc.roundedRect(20, 20, pageW - 40, pageH - 40, 8, 8, 'S');
        }

        function drawFooter(pageNum, totalPages) {
            doc.setFontSize(8);
            doc.setTextColor(...dimCyan);
            doc.text(`Page ${pageNum} / ${totalPages}`, pageW / 2, pageH - 28, { align: 'center' });
            doc.text('Keep being kawaii! ♡', pageW / 2, pageH - 16, { align: 'center' });
        }

        // We'll set total pages after building all pages
        let totalPages = 1;

        // ══════════════════════════════════════════════════
        // PAGE 1 — Title + Lifetime Stats + start of table
        // ══════════════════════════════════════════════════
        fillPage();
        drawPageBorder();
        let y = 50;

        // Title
        doc.setFontSize(20);
        doc.setTextColor(...cyan);
        doc.setFont('helvetica', 'bold');
        doc.text('Kawaii Plushie Claw Machine :3', pageW / 2, y, { align: 'center' });
        y += 22;
        doc.setFontSize(14);
        doc.setTextColor(...pink);
        doc.text('Game Stats', pageW / 2, y, { align: 'center' });
        y += 10;

        // Divider
        doc.setDrawColor(...pink);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageW - margin, y);
        y += 18;

        // ─── Lifetime Stats ───
        const stats = GameHistory.getLifetimeStats();
        const lifetimeRows = [
            ['Games Played', stats.totalGames.toLocaleString()],
            ['Lifetime Score', stats.lifetimeScore.toLocaleString()],
            ['Best Score', stats.bestScore.toLocaleString()],
            ['Lifetime Tickets', stats.lifetimeTickets.toLocaleString()],
            ['Plushies Caught', stats.totalPlushies.toLocaleString()],
            ['Shinies', stats.totalShinies.toLocaleString()],
            ['Perfect Games', stats.perfectGames.toLocaleString()],
        ];

        const statColW = contentW / 2;
        doc.setFontSize(10);
        for (let i = 0; i < lifetimeRows.length; i += 2) {
            // Left column
            doc.setTextColor(...softPink);
            doc.setFont('helvetica', 'normal');
            doc.text(lifetimeRows[i][0], margin + 4, y);
            doc.setTextColor(...white);
            doc.setFont('helvetica', 'bold');
            doc.text(lifetimeRows[i][1], margin + statColW - 8, y, { align: 'right' });

            // Right column (if exists)
            if (i + 1 < lifetimeRows.length) {
                doc.setTextColor(...softPink);
                doc.setFont('helvetica', 'normal');
                doc.text(lifetimeRows[i + 1][0], margin + statColW + 12, y);
                doc.setTextColor(...white);
                doc.setFont('helvetica', 'bold');
                doc.text(lifetimeRows[i + 1][1], pageW - margin - 4, y, { align: 'right' });
            }
            y += 16;
        }

        y += 8;

        // Divider
        doc.setDrawColor(...pink);
        doc.line(margin, y, pageW - margin, y);
        y += 16;

        // ─── Section title: Game History ───
        doc.setFontSize(13);
        doc.setTextColor(...pink);
        doc.setFont('helvetica', 'bold');
        doc.text('Game History', pageW / 2, y, { align: 'center' });
        y += 18;

        // ─── Build sorted history (same order as the modal) ───
        const history = GameHistory.getAll();
        const indexed = history.map((r, i) => ({ ...r, _idx: i }));
        const sorted = indexed.sort((a, b) => {
            let va, vb;
            if (statsSortField === 'date') {
                va = new Date(a.date).getTime();
                vb = new Date(b.date).getTime();
            } else {
                va = a[statsSortField] ?? 0;
                vb = b[statsSortField] ?? 0;
            }
            return statsSortAsc ? va - vb : vb - va;
        });

        // ─── Table layout ───
        const colWidths = [140, 90, 90, 70, 70]; // Date, Score, Tickets, Caught, Tokens Left
        const colHeaders = ['Date', 'Score', 'Tickets', 'Caught', 'Tokens Left'];
        const tableX = margin + (contentW - colWidths.reduce((a, b) => a + b, 0)) / 2;
        const rowHeight = 18;
        const headerHeight = 22;

        function drawTableHeader(atY) {
            // Header background
            doc.setFillColor(0, 255, 255, 0.12);
            doc.setFillColor(10, 30, 50);
            const totalW = colWidths.reduce((a, b) => a + b, 0);
            doc.setFillColor(0, 40, 60);
            doc.rect(tableX, atY - 13, totalW, headerHeight, 'F');

            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...cyan);
            let hx = tableX;
            for (let c = 0; c < colHeaders.length; c++) {
                const align = c === 0 ? 'left' : 'right';
                const tx = c === 0 ? hx + 6 : hx + colWidths[c] - 6;
                doc.text(colHeaders[c].toUpperCase(), tx, atY, { align });
                hx += colWidths[c];
            }

            // Header underline
            doc.setDrawColor(...cyan);
            doc.setLineWidth(0.8);
            doc.line(tableX, atY + 5, tableX + totalW, atY + 5);

            return atY + headerHeight;
        }

        y = drawTableHeader(y);

        // ─── Render rows across pages ───
        const bottomLimit = pageH - 55; // space for footer

        if (sorted.length === 0) {
            doc.setFontSize(10);
            doc.setTextColor(...softPink);
            doc.setFont('helvetica', 'italic');
            doc.text('No games played yet! Go catch some plushies!', pageW / 2, y + 20, { align: 'center' });
        } else {
            for (let i = 0; i < sorted.length; i++) {
                // Check if we need a new page
                if (y + rowHeight > bottomLimit) {
                    totalPages++;
                    doc.addPage();
                    fillPage();
                    drawPageBorder();
                    y = 50;

                    // Continuation header
                    doc.setFontSize(11);
                    doc.setTextColor(...pink);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Game History (continued)', pageW / 2, y, { align: 'center' });
                    y += 18;

                    y = drawTableHeader(y);
                }

                const r = sorted[i];
                const d = new Date(r.date);
                const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    + '  ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const perfectBadge = r.isPerfectGame ? ' *' : '';
                const shinyBadge = r.shinyCaught > 0 ? ` (+${r.shinyCaught}sh)` : '';
                const tokensLeftVal = r.tokensLeft != null ? String(r.tokensLeft) : '-';

                const rowColor = r.isPerfectGame ? gold : softPink;
                const scoreColor = r.isPerfectGame ? gold : gold; // score always gold

                // Subtle alternating row background
                if (i % 2 === 0) {
                    const totalW = colWidths.reduce((a, b) => a + b, 0);
                    doc.setFillColor(20, 5, 40);
                    doc.rect(tableX, y - 11, totalW, rowHeight, 'F');
                }

                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');

                let cx = tableX;

                // Date (left-aligned)
                doc.setTextColor(...rowColor);
                doc.text(dateStr, cx + 6, y);
                cx += colWidths[0];

                // Score (right-aligned)
                doc.setTextColor(...scoreColor);
                doc.setFont('courier', 'bold');
                doc.text(r.score.toLocaleString() + perfectBadge, cx + colWidths[1] - 6, y, { align: 'right' });
                cx += colWidths[1];

                // Tickets (right-aligned)
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...rowColor);
                doc.text(r.tickets.toLocaleString(), cx + colWidths[2] - 6, y, { align: 'right' });
                cx += colWidths[2];

                // Caught (right-aligned)
                doc.text(String(r.plushiesCaught) + shinyBadge, cx + colWidths[3] - 6, y, { align: 'right' });
                cx += colWidths[3];

                // Tokens Left (right-aligned)
                doc.text(tokensLeftVal, cx + colWidths[4] - 6, y, { align: 'right' });

                y += rowHeight;
            }
        }

        // ─── Render footers on all pages ───
        const pageCount = doc.internal.getNumberOfPages();
        for (let p = 1; p <= pageCount; p++) {
            doc.setPage(p);
            drawFooter(p, pageCount);
        }

        // ─── Export date on last page ───
        doc.setPage(pageCount);
        doc.setFontSize(7);
        doc.setTextColor(...dimCyan);
        const exportDate = new Date().toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        doc.text(`Exported: ${exportDate}`, pageW - margin, pageH - 40, { align: 'right' });

        // ─── Save ───
        doc.save(`kawaii-claw-stats-${new Date().toISOString().slice(0, 10)}.pdf`);

        btn.textContent = origText;
        btn.disabled = false;
    } catch (err) {
        console.error('Stats PDF export failed:', err);
        btn.textContent = origText;
        btn.disabled = false;
        alert('PDF export failed: ' + err.message);
    }
}

function exportStatsJSON() {
    const btn = document.getElementById('stats-export-json-btn');
    const stats = GameHistory.getLifetimeStats();
    const history = GameHistory.getAll();

    const exportData = {
        exportDate: new Date().toISOString(),
        lifetimeStats: stats,
        gameHistory: history,
    };

    const json = JSON.stringify(exportData, null, 2);

    // Save as file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `kawaii-claw-stats-${new Date().toISOString().slice(0, 10)}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    // Also copy to clipboard
    navigator.clipboard.writeText(json).then(() => {
        const origText = btn.textContent;
        btn.textContent = '✅ Saved & Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = origText;
            btn.classList.remove('copied');
        }, 1500);
    }).catch(() => {
        // Clipboard failed but file was still saved
        const origText = btn.textContent;
        btn.textContent = '✅ Saved!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = origText;
            btn.classList.remove('copied');
        }, 1500);
    });
}

function importStatsJSON() {
    const btn = document.getElementById('stats-import-json-btn');

    // Use a file picker instead of prompt() — prompt() is blocked on some hosts (e.g. GitHub Pages)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,application/json';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const raw = reader.result;

            // Parse & validate
            let data;
            try {
                data = JSON.parse(raw);
            } catch (e) {
                alert('❌ Invalid JSON — could not parse.\n\n' + e.message);
                return;
            }

            // Accept either the full export shape { gameHistory: [...] } or a bare array [...]
            let historyArr;
            if (Array.isArray(data)) {
                historyArr = data;
            } else if (data && Array.isArray(data.gameHistory)) {
                historyArr = data.gameHistory;
            } else {
                alert('❌ Invalid format — expected an exported stats JSON with a "gameHistory" array.');
                return;
            }

            // Basic validation of records
            const validRecords = historyArr.filter(r =>
                r && typeof r === 'object' &&
                typeof r.score === 'number' &&
                typeof r.tickets === 'number' &&
                typeof r.plushiesCaught === 'number' &&
                r.date
            );

            if (validRecords.length === 0) {
                alert('❌ No valid game records found in the JSON.');
                return;
            }

            const skipped = historyArr.length - validRecords.length;
            const skippedNote = skipped > 0 ? `\n(${skipped} invalid record(s) will be skipped)` : '';

            // Confirm before replacing
            const currentCount = GameHistory.getAll().length;
            const ok = confirm(
                `⚠️ This will REPLACE your current history (${currentCount} game${currentCount !== 1 ? 's' : ''}) ` +
                `with ${validRecords.length} imported game${validRecords.length !== 1 ? 's' : ''}.${skippedNote}\n\n` +
                `This cannot be undone! Continue?`
            );
            if (!ok) return;

            // Write to localStorage
            const trimmed = validRecords.slice(0, MAX_HISTORY);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));

            // Also restore plushiedex completion bonus if present
            if (data && data.lifetimeStats && typeof data.lifetimeStats.plushiedexCompletionBonus === 'number' && data.lifetimeStats.plushiedexCompletionBonus > 0) {
                GameHistory.awardPlushiedexCompletionBonus(data.lifetimeStats.plushiedexCompletionBonus);
            }

            // Refresh
            renderStatsModal();

            // Success flash
            const origText = btn.textContent;
            btn.textContent = '✅ Imported!';
            btn.classList.add('imported');
            setTimeout(() => {
                btn.textContent = origText;
                btn.classList.remove('imported');
            }, 1500);
        };

        reader.onerror = () => {
            alert('❌ Failed to read file.');
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    fileInput.remove();
}

function clearGameHistory() {
    if (confirm('Clear all game history? This cannot be undone!')) {
        GameHistory.clear();
        renderStatsModal();
        closeStatsModal();
        initGame();
    }
}

// Initialize on load
window.addEventListener('load', () => {



    try {
        // Prime audio only after a user interaction to satisfy autoplay policies.
        window.addEventListener('pointerdown', ensureAudioContext, { once: true });

        // Set up button event listeners
        document.getElementById('reset-btn').addEventListener('click', initGame);
        document.getElementById('export-btn').addEventListener('click', () => exportReportCard(document.getElementById('export-btn')));

        // Splash screen buttons
        document.getElementById('splash-export-btn').addEventListener('click', () => {
            exportReportCard(document.getElementById('splash-export-btn'));
        });
        document.getElementById('splash-new-game-btn').addEventListener('click', initGame);

        // Stats modal
        document.getElementById('stats-btn').addEventListener('click', openStatsModal);
        document.getElementById('stats-close-btn').addEventListener('click', closeStatsModal);
        document.getElementById('stats-clear-btn').addEventListener('click', clearGameHistory);
        document.getElementById('stats-export-pdf-btn').addEventListener('click', exportStatsPDF);
        document.getElementById('stats-export-json-btn').addEventListener('click', exportStatsJSON);
        document.getElementById('stats-import-json-btn').addEventListener('click', importStatsJSON);
        document.getElementById('stats-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'stats-overlay') closeStatsModal();
        });
        document.querySelectorAll('.stats-th-sort').forEach(th => {
            th.addEventListener('click', () => handleStatsSort(th.dataset.sort));
        });

        // Collection modal
        document.getElementById('collection-btn').addEventListener('click', openCollectionModal);
        document.getElementById('collection-close-btn').addEventListener('click', closeCollectionModal);
        document.getElementById('collection-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'collection-overlay') closeCollectionModal();
        });

        // Plushiedex overlay
        document.getElementById('plushiedex-btn').addEventListener('click', openPlushiedex);
        document.getElementById('plushiedex-close-btn').addEventListener('click', closePlushiedex);
        document.getElementById('plushiedex-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'plushiedex-overlay') closePlushiedex();
        });

        // Plushie detail overlay
        document.getElementById('plushie-detail-close-btn').addEventListener('click', closePlushieDetail);
        document.getElementById('plushie-detail-export-btn').addEventListener('click', exportPlushieAsPNG);
        document.getElementById('plushie-detail-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'plushie-detail-overlay') closePlushieDetail();
        });

        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', toggleSound);
        }
        updateSoundButton();

        // Tutorial buttons
        document.getElementById('tutorial-btn').addEventListener('click', openTutorial);
        document.getElementById('tutorial-close-btn').addEventListener('click', closeTutorial);
        document.getElementById('tutorial-start-btn').addEventListener('click', closeTutorial);
        document.getElementById('tutorial-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'tutorial-overlay') closeTutorial();
        });

        // Set up keyboard controls
        document.addEventListener('keydown', (e) => {
            // Close stats modal with Escape
            if (e.key === 'Escape') {
                const plushieDetailOverlay = document.getElementById('plushie-detail-overlay');
                if (plushieDetailOverlay.style.display === 'flex') {
                    closePlushieDetail();
                    return;
                }
                const tutorialOverlay = document.getElementById('tutorial-overlay');
                if (tutorialOverlay.style.display === 'flex') {
                    closeTutorial();
                    return;
                }
                const plushiedexOverlay = document.getElementById('plushiedex-overlay');
                if (plushiedexOverlay.style.display === 'flex') {
                    closePlushiedex();
                    return;
                }
                const collectionOverlay = document.getElementById('collection-overlay');
                if (collectionOverlay.style.display === 'flex') {
                    closeCollectionModal();
                    return;
                }
                const statsOverlay = document.getElementById('stats-overlay');
                if (statsOverlay.style.display === 'flex') {
                    closeStatsModal();
                    return;
                }
            }

            if (gameState.gameOver || gameState.isGrabbing) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    moveClaw('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moveClaw('right');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    moveClaw('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moveClaw('down');
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    grabPrize();
                    break;
            }
        });

        // ===== Mobile touch D-pad controls =====
        (function setupTouchControls() {
            const dpadBtns = document.querySelectorAll('.touch-dpad-btn');
            const grabBtn = document.getElementById('touch-grab-btn');
            if (!dpadBtns.length || !grabBtn) return;

            let moveInterval = null;
            let moveTimeout = null;

            function startMoving(dir) {
                stopMoving();
                moveClaw(dir);
                // After a short delay, repeat at ~60fps-ish speed
                moveTimeout = setTimeout(() => {
                    moveInterval = setInterval(() => moveClaw(dir), 50);
                }, 200);
            }

            function stopMoving() {
                if (moveTimeout) { clearTimeout(moveTimeout); moveTimeout = null; }
                if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
            }

            dpadBtns.forEach(btn => {
                const dir = btn.dataset.dir;

                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    startMoving(dir);
                }, { passive: false });

                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    stopMoving();
                }, { passive: false });

                btn.addEventListener('touchcancel', () => stopMoving());

                // Also support mouse for testing
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    startMoving(dir);
                });
                btn.addEventListener('mouseup', () => stopMoving());
                btn.addEventListener('mouseleave', () => stopMoving());
            });

            grabBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                grabPrize();
            }, { passive: false });

            grabBtn.addEventListener('click', () => grabPrize());
        })();


        // Initialize the game
        initGame();

        // Show tutorial for first-time visitors
        showTutorialIfFirstVisit();
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Error initializing game: ' + error.message);
    }
});
