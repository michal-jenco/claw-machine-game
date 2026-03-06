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
    caughtPrizes: []
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

    for (let i = 0; i < CONFIG.PRIZE_COUNT; i++) {
        const prizeType = CONFIG.PRIZE_TYPES[Math.floor(Math.random() * CONFIG.PRIZE_TYPES.length)];
        const position = findSpawnPosition(gameState.prizes);

        console.log(`Creating prize ${i}: ${prizeType.name} at (${position.x}, ${position.y})`);

        const prize = {
            id: i,
            x: position.x,
            y: position.y,
            emoji: prizeType.emoji,
            name: prizeType.name,
            points: prizeType.points,
            caught: false,
            type: prizeType.emoji
        };

        gameState.prizes.push(prize);

        const prizeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        prizeGroup.id = `prize-${i}`;
        prizeGroup.setAttribute('data-prize-id', i);
        prizeGroup.setAttribute('transform', `translate(${prize.x - CONFIG.PRIZE_SIZE / 2}, ${prize.y - CONFIG.PRIZE_SIZE / 2})`);
        prizeGroup.style.cursor = 'grab';
        prizeGroup.style.filter = 'drop-shadow(0 2px 5px rgba(255, 20, 147, 0.4))';
        prizeGroup.style.transition = 'opacity 0.3s';

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
            await wait(500);
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
    const bonusEl = document.getElementById('bonus-message');

    // Display in right panel with animated entrance
    bonusEl.innerHTML = `
        <div class="bonus-content">
            <div class="bonus-sparkle">✨</div>
            <div class="bonus-text">BONUS!</div>
            <div class="bonus-amount">+${bonusTokens} Token${plural}</div>
            <div class="bonus-reason">Multi-Catch!</div>
            <div class="bonus-sparkle">✨</div>
        </div>
    `;
    bonusEl.classList.add('show');

    // Also show briefly in bottom status
    displayGameStatus(`🎉 Bonus! +${bonusTokens} token${plural} for multi-catch!`);

    setTimeout(() => {
        bonusEl.classList.remove('show');
        setTimeout(() => {
            bonusEl.innerHTML = '';
        }, 500);

        if (!gameState.gameOver) {
            clearGameStatus();
        }
    }, 4000); // Increased from 1500ms to 4000ms
}

function showPerfectGameBonus() {
    // Award massive bonus
    gameState.score += CONFIG.PERFECT_GAME_BONUS;
    gameState.tickets += Math.floor(CONFIG.PERFECT_GAME_BONUS / 5);
    updateUI();

    const bonusEl = document.getElementById('bonus-message');

    // Display spectacular perfect game celebration
    bonusEl.innerHTML = `
        <div class="bonus-content perfect-game">
            <div class="bonus-sparkle">🎊</div>
            <div class="bonus-text">PERFECT GAME!</div>
            <div class="bonus-amount perfect">+${CONFIG.PERFECT_GAME_BONUS} POINTS</div>
            <div class="bonus-reason">ALL PLUSHIES CAUGHT!</div>
            <div class="bonus-sparkle">🎊</div>
        </div>
    `;
    bonusEl.classList.add('show');

    // Also show in bottom status
    displayGameStatus(`🎊🎉 PERFECT GAME! +${CONFIG.PERFECT_GAME_BONUS} BONUS POINTS! 🎉🎊`);
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

        const plushieSVG = PlushieFactory.createPlushieSVG(
            PlushieFactory.getPrizeType(prize.emoji),
            90
        );

        plushieItem.innerHTML = `
            ${plushieSVG}
            <div class="report-plushie-name">${prize.name}</div>
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
// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            moveClaw('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            moveClaw('down');
            break;
        case 'ArrowLeft':
            e.preventDefault();
            moveClaw('left');
            break;
        case 'ArrowRight':
            e.preventDefault();
            moveClaw('right');
            break;
        case ' ':
            e.preventDefault();
            grabPrize();
            break;
    }
});

// Initialize on load
window.addEventListener('load', () => {
    console.log('Window loaded, setting up game...');
    console.log('PlushieFactory available:', typeof PlushieFactory !== 'undefined');

    try {
        // Set up button event listeners
        document.getElementById('up-btn').addEventListener('click', () => moveClaw('up'));
        document.getElementById('down-btn').addEventListener('click', () => moveClaw('down'));
        document.getElementById('left-btn').addEventListener('click', () => moveClaw('left'));
        document.getElementById('right-btn').addEventListener('click', () => moveClaw('right'));
        document.getElementById('grab-btn').addEventListener('click', grabPrize);
        document.getElementById('reset-btn').addEventListener('click', initGame);
        document.getElementById('export-btn').addEventListener('click', exportReportCard);

        console.log('Event listeners set up');

        // Initialize the game
        initGame();
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Error initializing game: ' + error.message);
    }
});
