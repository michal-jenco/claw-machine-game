console.log('🎮 Script.js is loading...');

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
    lastMoveSoundAt: 0
};

// Configuration
const CONFIG = {
    GLASS_BOX_LEFT: 70,
    GLASS_BOX_TOP: 130,
    GLASS_BOX_WIDTH: 560,
    GLASS_BOX_HEIGHT: 420,
    CLAW_HOME_X: 350,
    CLAW_HOME_Y: 160,
    CLAW_ASSEMBLY_BASE_X: 350,
    CLAW_ASSEMBLY_BASE_Y: 300,
    CLAW_SPEED: 8,
    CLAW_RADIUS: 40,
    MAX_TOKENS: 5,
    PRIZE_COUNT: 12,
    PERFECT_GAME_BONUS: 500,
    BONUS_DISPLAY_MS: 4000,
    PERFECT_BONUS_DISPLAY_MS: 5000,
    SHINY_BONUS_POINTS: 1000,
    SHINY_TO_BONUS_DELAY_MS: 4200,
    PRIZE_SIZE: 82,
    PRIZE_RADIUS: 41,
    PRIZE_EDGE_PADDING: 22,
    PRIZE_ROW_TOP_PADDING: 52,
    PRIZE_SPAWN_ATTEMPTS: 60,
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

// Initialize game
function initGame() {
    console.log('initGame called');
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

    // Enable all control buttons
    toggleButtons(true);

    resetClawPosition();
    console.log('initGame completed');
}

// Generate random prizes in the glass box (SVG)
function generatePrizes() {
    console.log('generatePrizes called');
    const container = document.getElementById('prizes-svg-container');
    console.log('Container:', container);

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

        console.log(`Creating prize ${i}: ${prizeType.name} at (${position.x}, ${position.y})${isShiny ? ' [SHINY]' : ''}`);

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
        prizeGroup.style.cursor = 'grab';
        prizeGroup.style.filter = 'drop-shadow(0 2px 5px rgba(255, 20, 147, 0.4))';
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
            console.log(`Prize ${i} added successfully`);
        } catch (error) {
            console.error(`Error creating prize ${i}:`, error);
        }
    }

    console.log(`Total prizes created: ${gameState.prizes.length}`);
    console.log('Container children count:', container.children.length);
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
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('tickets').textContent = gameState.tickets;
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
            gameState.clawY = Math.max(CONFIG.GLASS_BOX_TOP + topMargin, gameState.clawY - step);
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

// Update claw visual position in SVG
function updateClawPosition() {
    const clawAssembly = document.getElementById('claw-assembly');
    const clawArm = document.getElementById('claw-arm');

    // Update arm length dynamically
    clawArm.setAttribute('y2', gameState.clawY + 30);

    // Keep assembly movement anchored to the SVG's base claw geometry.
    const offsetX = gameState.clawX - CONFIG.CLAW_ASSEMBLY_BASE_X;
    const offsetY = gameState.clawY - CONFIG.CLAW_ASSEMBLY_BASE_Y;

    clawAssembly.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
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
    playSound('grab');

    // Disable buttons during grab
    toggleButtons(false);

    try {
        // Close claw fingers
        closeClaw();
        await wait(300);

        // Move claw down
        await moveClawDown();
        await wait(200);

        // Check for caught prizes
        const caughtCount = await checkPrizeCollision();
        const bonusTokens = caughtCount > 1
            ? Math.min(CONFIG.MAX_TOKENS - gameState.tokens, caughtCount - 1)
            : 0;

        if (bonusTokens > 0) {
            gameState.tokens += bonusTokens;
            updateUI();
            showBonusMessage(bonusTokens);
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
            await wait(4500);
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

// Close claw
function closeClaw() {
    const leftFinger = document.getElementById('left-finger');
    const rightFinger = document.getElementById('right-finger');
    const centerFinger = document.getElementById('center-finger');
    const glowCircle = document.getElementById('claw-glow');

    if (leftFinger) leftFinger.setAttribute('transform', 'translate(-5, 0)');
    if (rightFinger) rightFinger.setAttribute('transform', 'translate(5, 0)');
    if (centerFinger) centerFinger.setAttribute('transform', 'scaleY(0.8)');
    if (glowCircle) glowCircle.style.opacity = '1';
}

// Open claw
function openClaw() {
    const leftFinger = document.getElementById('left-finger');
    const rightFinger = document.getElementById('right-finger');
    const centerFinger = document.getElementById('center-finger');
    const glowCircle = document.getElementById('claw-glow');

    if (leftFinger) leftFinger.setAttribute('transform', 'translate(0, 0)');
    if (rightFinger) rightFinger.setAttribute('transform', 'translate(0, 0)');
    if (centerFinger) centerFinger.setAttribute('transform', 'scaleY(1)');
    if (glowCircle) glowCircle.style.opacity = '0';
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
    let caughtCount = 0;

    for (const prize of gameState.prizes) {
        if (prize.caught) continue;

        const prizeEl = document.getElementById(`prize-${prize.id}`);
        if (!prizeEl) continue;

        const dx = gameState.clawX - prize.x;
        const dy = gameState.clawY - prize.y;
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

    // Show export button if player caught any plushies
    const exportBtn = document.getElementById('export-btn');
    if (gameState.caughtPrizes.length > 0) {
        exportBtn.style.display = 'block';
        exportBtn.disabled = false;
        exportBtn.style.opacity = '1';
    }

    let message;
    if (isPerfect) {
        message = `🎊🎉 PERFECT GAME! 🎉🎊 All Plushies Caught! | Final Score: ${gameState.score} | Tickets Won: ${gameState.tickets}`;
    } else {
        message = `🎉 Game Over! Final Score: ${gameState.score} | Tickets Won: ${gameState.tickets}`;
        playSound('gameOver');
    }
    displayGameStatus(message);
}

// Display status message
function displayGameStatus(message) {
    const statusEl = document.getElementById('game-status');
    statusEl.textContent = message;
}

function showBonusMessage(bonusTokens) {
    const plural = bonusTokens === 1 ? '' : 's';

    const bonusCardHtml = `
        <div class="bonus-content">
            <div class="bonus-sparkle">✨</div>
            <div class="bonus-text">BONUS!</div>
            <div class="bonus-amount">+${bonusTokens} Token${plural}</div>
            <div class="bonus-reason">Multi-Catch!</div>
            <div class="bonus-sparkle">✨</div>
        </div>
    `;

    const elapsedSinceShiny = Date.now() - gameState.lastShinyCatchAt;
    const delayMs = elapsedSinceShiny < CONFIG.SHINY_TO_BONUS_DELAY_MS
        ? CONFIG.SHINY_TO_BONUS_DELAY_MS - elapsedSinceShiny
        : 0;

    const showCard = () => {
        playSound('bonus');
        showBonusCard(
            bonusCardHtml,
            `🎉 Bonus! +${bonusTokens} token${plural} for multi-catch!`,
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
    // Award massive bonus
    gameState.score += CONFIG.PERFECT_GAME_BONUS;
    gameState.tickets += Math.floor(CONFIG.PERFECT_GAME_BONUS / 5);
    updateUI();
    playSound('perfect');

    const perfectCardHtml = `
        <div class="bonus-content perfect-game">
            <div class="bonus-sparkle">🎊</div>
            <div class="bonus-text">PERFECT GAME!</div>
            <div class="bonus-amount perfect">+${CONFIG.PERFECT_GAME_BONUS} POINTS</div>
            <div class="bonus-reason">ALL PLUSHIES CAUGHT!</div>
            <div class="bonus-sparkle">🎊</div>
        </div>
    `;

    showBonusCard(
        perfectCardHtml,
        `🎊🎉 PERFECT GAME! +${CONFIG.PERFECT_GAME_BONUS} BONUS POINTS! 🎉🎊`,
        CONFIG.PERFECT_BONUS_DISPLAY_MS
    );
}

function showShinyCatchMessage(prize, shinyBonus) {
    const shinyCardHtml = `
        <div class="bonus-content shiny-catch">
            <div class="bonus-sparkle">✨</div>
            <div class="bonus-text">SHINY CATCH!</div>
            <div class="bonus-amount perfect">+${shinyBonus} POINTS</div>
            <div class="bonus-reason">${prize.name} (Rare Variant) × 10</div>
            <div class="bonus-sparkle">✨</div>
        </div>
    `;

    showBonusCard(
        shinyCardHtml,
        `✨ SHINY BONUS! +${shinyBonus} points for ${prize.name}!`,
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

// Generate Report Card
function generateReportCard() {
    // Populate stats
    document.getElementById('report-score').textContent = gameState.score;
    document.getElementById('report-tickets').textContent = gameState.tickets;
    document.getElementById('report-count').textContent = gameState.caughtPrizes.length;

    // Show perfect badge if applicable
    const perfectBadge = document.getElementById('report-perfect-badge');
    if (gameState.isPerfectGame) {
        perfectBadge.style.display = 'block';
    } else {
        perfectBadge.style.display = 'none';
    }

    // Populate plushies grid
    const plushiesGrid = document.getElementById('report-plushies');
    plushiesGrid.innerHTML = '';

    gameState.caughtPrizes.forEach(prize => {
        const plushieItem = document.createElement('div');
        plushieItem.className = 'report-plushie-item';
        if (prize.shiny) {
            plushieItem.classList.add('report-shiny-plushie');
        }

        const plushieSVG = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(prize.emoji),
            90
        );

        plushieItem.innerHTML = `
            ${plushieSVG}
            <div class="report-plushie-name">${prize.shiny ? '✨ Shiny ' : ''}${prize.name}</div>
        `;

        plushiesGrid.appendChild(plushieItem);
    });

    // Add date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('report-date').textContent = dateStr;
}

// Export Report Card as PNG
async function exportReportCard() {
    const exportBtn = document.getElementById('export-btn');
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
            backgroundColor: '#FFE4F5',
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

// Initialize on load
window.addEventListener('load', () => {
    console.log('Window loaded, setting up game...');
    console.log('PlushieFactory available:', typeof PlushieFactory !== 'undefined');

    try {
        // Prime audio only after a user interaction to satisfy autoplay policies.
        window.addEventListener('pointerdown', ensureAudioContext, { once: true });

        // Set up button event listeners
        document.getElementById('reset-btn').addEventListener('click', initGame);
        document.getElementById('export-btn').addEventListener('click', exportReportCard);

        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', toggleSound);
        }
        updateSoundButton();

        // Set up keyboard controls
        document.addEventListener('keydown', (e) => {
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

        console.log('Event listeners set up');

        // Initialize the game
        initGame();
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Error initializing game: ' + error.message);
    }
});
