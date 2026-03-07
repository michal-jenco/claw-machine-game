// Plushie SVG Generator — Generation 3: The Apothecary Diaries (Kusuriya no Hitorigoto)
// Characters: Maomao, Jinshi, Gyokuyo, Lishu, Lakan, Xiaolan, Gaoshun, Fengxian, Ah-Duo
class PlushieFactoryGen3 {

    // ===== Maomao (Emi) — dark green-black hair, blue eyes, simple apothecary robe =====

    static createMaomaoPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="mao-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#2E4A3E;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1B2F28;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="mao-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFECB3;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFE0B2;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="mao-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#5C8A6E;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3E6B52;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair back layer -->
                <ellipse cx="${size*0.5}" cy="${size*0.19}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#mao-hair-${size})"/>
                <!-- Hair bun on top (Maomao's signature updo) -->
                <circle cx="${size*0.5}" cy="${size*0.05}" r="${size*0.08}" fill="url(#mao-hair-${size})"/>
                <!-- Bun wrap (white cloth) -->
                <path d="M ${size*0.44} ${size*0.04} Q ${size*0.5} ${size*0.00} ${size*0.56} ${size*0.04}" stroke="#E8F5E9" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>
                <!-- Straight-cut bangs -->
                <rect x="${size*0.30}" y="${size*0.15}" width="${size*0.40}" height="${size*0.10}" rx="${size*0.03}" fill="url(#mao-hair-${size})"/>
                <!-- Side hair strands (short, framing face) -->
                <rect x="${size*0.24}" y="${size*0.20}" width="${size*0.07}" height="${size*0.24}" rx="${size*0.025}" fill="url(#mao-hair-${size})"/>
                <rect x="${size*0.69}" y="${size*0.20}" width="${size*0.07}" height="${size*0.24}" rx="${size*0.025}" fill="url(#mao-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#mao-face-${size})"/>

                <!-- Eyes (bright blue — Maomao's striking blue eyes) -->
                <ellipse cx="${size*0.38}" cy="${size*0.36}" rx="${size*0.055}" ry="${size*0.07}" fill="#4FC3F7"/>
                <ellipse cx="${size*0.62}" cy="${size*0.36}" rx="${size*0.055}" ry="${size*0.07}" fill="#4FC3F7"/>
                <circle cx="${size*0.38}" cy="${size*0.35}" r="${size*0.028}" fill="#1565C0"/>
                <circle cx="${size*0.62}" cy="${size*0.35}" r="${size*0.028}" fill="#1565C0"/>
                <circle cx="${size*0.40}" cy="${size*0.33}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.33}" r="${size*0.012}" fill="#FFF"/>

                <!-- Freckles (Maomao's trademark) -->
                <circle cx="${size*0.33}" cy="${size*0.42}" r="${size*0.008}" fill="#A1887F" opacity="0.6"/>
                <circle cx="${size*0.36}" cy="${size*0.44}" r="${size*0.008}" fill="#A1887F" opacity="0.6"/>
                <circle cx="${size*0.64}" cy="${size*0.44}" r="${size*0.008}" fill="#A1887F" opacity="0.6"/>
                <circle cx="${size*0.67}" cy="${size*0.42}" r="${size*0.008}" fill="#A1887F" opacity="0.6"/>

                <!-- Slight smirk (analytical Maomao) -->
                <path d="M ${size*0.43} ${size*0.49} Q ${size*0.50} ${size*0.53} ${size*0.57} ${size*0.48}" stroke="#8D6E63" stroke-width="${size*0.016}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.27}" cy="${size*0.43}" r="${size*0.035}" fill="#FFB6E1" opacity="0.45"/>
                <circle cx="${size*0.73}" cy="${size*0.43}" r="${size*0.035}" fill="#FFB6E1" opacity="0.45"/>

                <!-- Body (muted green apothecary robe) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.74} ${size*0.88} Q ${size*0.5} ${size*0.92} ${size*0.26} ${size*0.88} Z" fill="url(#mao-robe-${size})"/>

                <!-- Inner white collar layer -->
                <path d="M ${size*0.38} ${size*0.57} L ${size*0.5} ${size*0.64} L ${size*0.62} ${size*0.57}" stroke="#FFF9C4" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Sash -->
                <rect x="${size*0.30}" y="${size*0.73}" width="${size*0.40}" height="${size*0.035}" rx="${size*0.01}" fill="#C62828" opacity="0.6"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>
                <ellipse cx="${size*0.82}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.05}" fill="#4E342E"/>
                <ellipse cx="${size*0.62}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.05}" fill="#4E342E"/>
            </svg>
        `;
    }

    // ===== Jinshi (Kaiji) — long brown-purple hair, handsome, ornate robes =====

    static createJinshiPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="jin-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#7B5E57;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4E342E;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="jin-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="jin-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#5D4037;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Long flowing hair (brown with purple tint, past shoulders) -->
                <ellipse cx="${size*0.5}" cy="${size*0.18}" rx="${size*0.30}" ry="${size*0.16}" fill="url(#jin-hair-${size})"/>
                <!-- Hair flowing down left -->
                <rect x="${size*0.18}" y="${size*0.18}" width="${size*0.12}" height="${size*0.48}" rx="${size*0.045}" fill="url(#jin-hair-${size})"/>
                <!-- Hair flowing down right -->
                <rect x="${size*0.70}" y="${size*0.18}" width="${size*0.12}" height="${size*0.48}" rx="${size*0.045}" fill="url(#jin-hair-${size})"/>
                <!-- Top knot / half-up portion -->
                <ellipse cx="${size*0.5}" cy="${size*0.08}" rx="${size*0.08}" ry="${size*0.06}" fill="url(#jin-hair-${size})"/>
                <!-- Gold hair ornament pin -->
                <rect x="${size*0.46}" y="${size*0.03}" width="${size*0.08}" height="${size*0.025}" rx="${size*0.008}" fill="#FFD700"/>
                <circle cx="${size*0.5}" cy="${size*0.03}" r="${size*0.018}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#jin-face-${size})"/>

                <!-- Eyes (violet/purple — Jinshi's distinctive beautiful eyes) -->
                <ellipse cx="${size*0.38}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.07}" fill="#CE93D8"/>
                <ellipse cx="${size*0.62}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.07}" fill="#CE93D8"/>
                <circle cx="${size*0.38}" cy="${size*0.34}" r="${size*0.028}" fill="#6A1B9A"/>
                <circle cx="${size*0.62}" cy="${size*0.34}" r="${size*0.028}" fill="#6A1B9A"/>
                <circle cx="${size*0.40}" cy="${size*0.32}" r="${size*0.013}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.32}" r="${size*0.013}" fill="#FFF"/>

                <!-- Charming smile -->
                <path d="M ${size*0.42} ${size*0.48} Q ${size*0.5} ${size*0.54} ${size*0.58} ${size*0.48}" stroke="#AB47BC" stroke-width="${size*0.016}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.27}" cy="${size*0.42}" r="${size*0.035}" fill="#FFB6E1" opacity="0.4"/>
                <circle cx="${size*0.73}" cy="${size*0.42}" r="${size*0.035}" fill="#FFB6E1" opacity="0.4"/>

                <!-- Body (layered brown/green court robes) -->
                <path d="M ${size*0.32} ${size*0.56} Q ${size*0.5} ${size*0.53} ${size*0.68} ${size*0.56} L ${size*0.74} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.26} ${size*0.90} Z" fill="url(#jin-robe-${size})"/>
                <!-- Green inner robe layer showing at collar -->
                <path d="M ${size*0.36} ${size*0.56} L ${size*0.5} ${size*0.66} L ${size*0.64} ${size*0.56}" stroke="#66BB6A" stroke-width="${size*0.022}" fill="none" stroke-linecap="round"/>
                <!-- Outer collar trim -->
                <path d="M ${size*0.34} ${size*0.57} L ${size*0.5} ${size*0.68} L ${size*0.66} ${size*0.57}" stroke="#FFD54F" stroke-width="${size*0.01}" fill="none" stroke-linecap="round"/>

                <!-- Gold sash -->
                <rect x="${size*0.30}" y="${size*0.74}" width="${size*0.40}" height="${size*0.035}" rx="${size*0.01}" fill="#FFD700" opacity="0.7"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>
                <ellipse cx="${size*0.82}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#3E2723"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#3E2723"/>
            </svg>
        `;
    }

    // ===== Gaoshun (Alex) — short dark hair, stern face, blue headband, dark robes =====

    static createGaoshunPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="gao-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#37474F;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="gao-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFECB3;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFE0B2;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="gao-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#37474F;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#263238;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (short, neat, very dark) -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.26}" ry="${size*0.15}" fill="url(#gao-hair-${size})"/>
                <!-- Blue headband / cap (Gaoshun's official hat) -->
                <rect x="${size*0.28}" y="${size*0.12}" width="${size*0.44}" height="${size*0.06}" rx="${size*0.02}" fill="#1565C0"/>
                <rect x="${size*0.32}" y="${size*0.10}" width="${size*0.36}" height="${size*0.04}" rx="${size*0.015}" fill="#1976D2"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#gao-face-${size})"/>

                <!-- Eyes (stern, narrow — dark brown, serious) -->
                <path d="M ${size*0.30} ${size*0.36} Q ${size*0.37} ${size*0.32} ${size*0.44} ${size*0.35}" stroke="#37474F" stroke-width="${size*0.024}" fill="none" stroke-linecap="round"/>
                <path d="M ${size*0.56} ${size*0.35} Q ${size*0.63} ${size*0.32} ${size*0.70} ${size*0.36}" stroke="#37474F" stroke-width="${size*0.024}" fill="none" stroke-linecap="round"/>
                <circle cx="${size*0.37}" cy="${size*0.36}" r="${size*0.016}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.36}" r="${size*0.016}" fill="#000"/>

                <!-- Straight neutral mouth -->
                <line x1="${size*0.44}" y1="${size*0.49}" x2="${size*0.56}" y2="${size*0.49}" stroke="#546E7A" stroke-width="${size*0.015}" stroke-linecap="round"/>

                <!-- Body (dark official robe) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.74} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.26} ${size*0.90} Z" fill="url(#gao-robe-${size})"/>

                <!-- Blue collar trim (matches headband) -->
                <path d="M ${size*0.38} ${size*0.57} L ${size*0.5} ${size*0.65} L ${size*0.62} ${size*0.57}" stroke="#1976D2" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Dark sash -->
                <rect x="${size*0.30}" y="${size*0.73}" width="${size*0.40}" height="${size*0.035}" rx="${size*0.01}" fill="#1a1a2e" opacity="0.8"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>
                <ellipse cx="${size*0.82}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
            </svg>
        `;
    }

    // ===== Gyokuyo (Molly) — pink/rose hair, ornate red-pink hanfu, warm smile =====

    static createGyokuyoPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="gyo-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#F48FB1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#E91E63;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="gyo-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="gyo-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#EF5350;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C62828;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (rose pink, elaborate updo with curls) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.27}" ry="${size*0.14}" fill="url(#gyo-hair-${size})"/>
                <!-- Voluminous side curls -->
                <circle cx="${size*0.20}" cy="${size*0.20}" r="${size*0.10}" fill="url(#gyo-hair-${size})"/>
                <circle cx="${size*0.80}" cy="${size*0.20}" r="${size*0.10}" fill="url(#gyo-hair-${size})"/>
                <!-- Updo bun -->
                <ellipse cx="${size*0.5}" cy="${size*0.06}" rx="${size*0.10}" ry="${size*0.06}" fill="url(#gyo-hair-${size})"/>

                <!-- Gold tiara / hair ornament -->
                <path d="M ${size*0.36} ${size*0.09} Q ${size*0.5} ${size*0.02} ${size*0.64} ${size*0.09}" stroke="#FFD700" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>
                <circle cx="${size*0.5}" cy="${size*0.04}" r="${size*0.02}" fill="#FFD700"/>
                <!-- Side hair jewels -->
                <circle cx="${size*0.22}" cy="${size*0.13}" r="${size*0.018}" fill="#FFD700"/>
                <circle cx="${size*0.78}" cy="${size*0.13}" r="${size*0.018}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#gyo-face-${size})"/>

                <!-- Eyes (warm green — Gyokuyo's kind eyes) -->
                <ellipse cx="${size*0.38}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.075}" fill="#81C784"/>
                <ellipse cx="${size*0.62}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.075}" fill="#81C784"/>
                <circle cx="${size*0.38}" cy="${size*0.33}" r="${size*0.028}" fill="#2E7D32"/>
                <circle cx="${size*0.62}" cy="${size*0.33}" r="${size*0.028}" fill="#2E7D32"/>
                <circle cx="${size*0.40}" cy="${size*0.31}" r="${size*0.013}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.31}" r="${size*0.013}" fill="#FFF"/>

                <!-- Warm smile -->
                <path d="M ${size*0.41} ${size*0.48} Q ${size*0.5} ${size*0.55} ${size*0.59} ${size*0.48}" stroke="#E91E63" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.27}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.73}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (red/crimson ornate robe) -->
                <path d="M ${size*0.30} ${size*0.56} Q ${size*0.5} ${size*0.53} ${size*0.70} ${size*0.56} L ${size*0.76} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.24} ${size*0.90} Z" fill="url(#gyo-robe-${size})"/>

                <!-- Gold ornate collar -->
                <path d="M ${size*0.36} ${size*0.56} L ${size*0.5} ${size*0.66} L ${size*0.64} ${size*0.56}" stroke="#FFD700" stroke-width="${size*0.025}" fill="none" stroke-linecap="round"/>

                <!-- Gold sash with flower -->
                <rect x="${size*0.28}" y="${size*0.73}" width="${size*0.44}" height="${size*0.04}" rx="${size*0.01}" fill="#FFD700" opacity="0.7"/>
                <circle cx="${size*0.50}" cy="${size*0.75}" r="${size*0.015}" fill="#FF5252"/>

                <!-- Arms -->
                <ellipse cx="${size*0.16}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>
                <ellipse cx="${size*0.84}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#AD1457"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#AD1457"/>
            </svg>
        `;
    }

    // ===== Fengxian (Trina) — purple/lavender hair, blue earrings, elegant courtesan =====

    static createFengxianPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="feng-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#B39DDB;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#7E57C2;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="feng-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="feng-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#9575CD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#5E35B1;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (lavender-purple, elaborately pinned up, courtesan style) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.28}" ry="${size*0.15}" fill="url(#feng-hair-${size})"/>
                <!-- Elaborate updo -->
                <ellipse cx="${size*0.5}" cy="${size*0.05}" rx="${size*0.12}" ry="${size*0.06}" fill="url(#feng-hair-${size})"/>
                <!-- Long strands flowing down -->
                <rect x="${size*0.17}" y="${size*0.16}" width="${size*0.10}" height="${size*0.50}" rx="${size*0.04}" fill="url(#feng-hair-${size})"/>
                <rect x="${size*0.73}" y="${size*0.16}" width="${size*0.10}" height="${size*0.50}" rx="${size*0.04}" fill="url(#feng-hair-${size})"/>

                <!-- Blue dangling earrings (her signature) -->
                <circle cx="${size*0.26}" cy="${size*0.42}" r="${size*0.02}" fill="#42A5F5"/>
                <circle cx="${size*0.26}" cy="${size*0.46}" r="${size*0.015}" fill="#1E88E5"/>
                <circle cx="${size*0.74}" cy="${size*0.42}" r="${size*0.02}" fill="#42A5F5"/>
                <circle cx="${size*0.74}" cy="${size*0.46}" r="${size*0.015}" fill="#1E88E5"/>

                <!-- Hair ornament -->
                <circle cx="${size*0.42}" cy="${size*0.04}" r="${size*0.018}" fill="#42A5F5"/>
                <circle cx="${size*0.58}" cy="${size*0.04}" r="${size*0.018}" fill="#42A5F5"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#feng-face-${size})"/>

                <!-- Eyes (half-lidded, melancholic purple) -->
                <path d="M ${size*0.30} ${size*0.35} Q ${size*0.37} ${size*0.31} ${size*0.44} ${size*0.35}" stroke="#7E57C2" stroke-width="${size*0.022}" fill="none" stroke-linecap="round"/>
                <path d="M ${size*0.56} ${size*0.35} Q ${size*0.63} ${size*0.31} ${size*0.70} ${size*0.35}" stroke="#7E57C2" stroke-width="${size*0.022}" fill="none" stroke-linecap="round"/>
                <circle cx="${size*0.37}" cy="${size*0.36}" r="${size*0.018}" fill="#4A148C"/>
                <circle cx="${size*0.63}" cy="${size*0.36}" r="${size*0.018}" fill="#4A148C"/>

                <!-- Beauty mark -->
                <circle cx="${size*0.58}" cy="${size*0.44}" r="${size*0.01}" fill="#5D4037"/>

                <!-- Gentle sad smile -->
                <path d="M ${size*0.44} ${size*0.48} Q ${size*0.5} ${size*0.52} ${size*0.56} ${size*0.48}" stroke="#9575CD" stroke-width="${size*0.014}" fill="none" stroke-linecap="round"/>

                <!-- Body (deep purple courtesan robes) -->
                <path d="M ${size*0.30} ${size*0.56} Q ${size*0.5} ${size*0.53} ${size*0.70} ${size*0.56} L ${size*0.76} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.24} ${size*0.90} Z" fill="url(#feng-robe-${size})"/>

                <!-- Ornate collar -->
                <path d="M ${size*0.36} ${size*0.56} L ${size*0.5} ${size*0.66} L ${size*0.64} ${size*0.56}" stroke="#FFD700" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Gold sash -->
                <rect x="${size*0.28}" y="${size*0.73}" width="${size*0.44}" height="${size*0.04}" rx="${size*0.01}" fill="#FFD700" opacity="0.55"/>

                <!-- Arms -->
                <ellipse cx="${size*0.16}" cy="${size*0.70}" rx="${size*0.06}" ry="${size*0.12}" fill="#FFF8E1"/>
                <ellipse cx="${size*0.84}" cy="${size*0.70}" rx="${size*0.06}" ry="${size*0.12}" fill="#FFF8E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#4A148C"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#4A148C"/>
            </svg>
        `;
    }

    // ===== Lishu (Reshel) — brown curly hair, gold jewelry, gentle/nervous, white-gold robe =====

    static createLishuPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="lis-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#A1887F;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#6D4C41;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lis-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lis-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#FFF9C4;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFF176;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (brown, curly/wavy, pinned up with ornaments) -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.27}" ry="${size*0.15}" fill="url(#lis-hair-${size})"/>
                <!-- Curly side locks -->
                <circle cx="${size*0.22}" cy="${size*0.22}" r="${size*0.08}" fill="url(#lis-hair-${size})"/>
                <circle cx="${size*0.78}" cy="${size*0.22}" r="${size*0.08}" fill="url(#lis-hair-${size})"/>
                <!-- Ringlet curls hanging down -->
                <ellipse cx="${size*0.20}" cy="${size*0.34}" rx="${size*0.04}" ry="${size*0.08}" fill="url(#lis-hair-${size})"/>
                <ellipse cx="${size*0.80}" cy="${size*0.34}" rx="${size*0.04}" ry="${size*0.08}" fill="url(#lis-hair-${size})"/>
                <!-- Updo -->
                <circle cx="${size*0.5}" cy="${size*0.06}" r="${size*0.07}" fill="url(#lis-hair-${size})"/>

                <!-- Gold necklace / jewelry -->
                <path d="M ${size*0.34} ${size*0.54} Q ${size*0.5} ${size*0.58} ${size*0.66} ${size*0.54}" stroke="#FFD700" stroke-width="${size*0.012}" fill="none" stroke-linecap="round"/>
                <circle cx="${size*0.5}" cy="${size*0.57}" r="${size*0.015}" fill="#FFD700"/>
                <!-- Hair ornaments (gold) -->
                <circle cx="${size*0.44}" cy="${size*0.06}" r="${size*0.018}" fill="#FFD700"/>
                <circle cx="${size*0.56}" cy="${size*0.06}" r="${size*0.018}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#lis-face-${size})"/>

                <!-- Eyes (big, purple, nervous/teary) -->
                <ellipse cx="${size*0.38}" cy="${size*0.34}" rx="${size*0.06}" ry="${size*0.085}" fill="#CE93D8"/>
                <ellipse cx="${size*0.62}" cy="${size*0.34}" rx="${size*0.06}" ry="${size*0.085}" fill="#CE93D8"/>
                <circle cx="${size*0.38}" cy="${size*0.33}" r="${size*0.03}" fill="#6A1B9A"/>
                <circle cx="${size*0.62}" cy="${size*0.33}" r="${size*0.03}" fill="#6A1B9A"/>
                <circle cx="${size*0.40}" cy="${size*0.31}" r="${size*0.014}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.31}" r="${size*0.014}" fill="#FFF"/>
                <!-- Teary sparkles -->
                <circle cx="${size*0.36}" cy="${size*0.30}" r="${size*0.007}" fill="#FFF" opacity="0.8"/>
                <circle cx="${size*0.60}" cy="${size*0.30}" r="${size*0.007}" fill="#FFF" opacity="0.8"/>

                <!-- Nervous small mouth -->
                <path d="M ${size*0.46} ${size*0.49} Q ${size*0.5} ${size*0.51} ${size*0.54} ${size*0.49}" stroke="#A1887F" stroke-width="${size*0.013}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.27}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.55"/>
                <circle cx="${size*0.73}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.55"/>

                <!-- Body (pale yellow-white robe — Crystal Pavilion) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.74} ${size*0.88} Q ${size*0.5} ${size*0.92} ${size*0.26} ${size*0.88} Z" fill="url(#lis-robe-${size})"/>

                <!-- White collar -->
                <path d="M ${size*0.38} ${size*0.57} L ${size*0.5} ${size*0.64} L ${size*0.62} ${size*0.57}" stroke="#FFF" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Gold sash -->
                <rect x="${size*0.30}" y="${size*0.73}" width="${size*0.40}" height="${size*0.035}" rx="${size*0.01}" fill="#FFD700" opacity="0.6"/>

                <!-- Arms -->
                <ellipse cx="${size*0.19}" cy="${size*0.68}" rx="${size*0.065}" ry="${size*0.11}" fill="#FFF8E1"/>
                <ellipse cx="${size*0.81}" cy="${size*0.68}" rx="${size*0.065}" ry="${size*0.11}" fill="#FFF8E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.94}" rx="${size*0.065}" ry="${size*0.05}" fill="#8D6E63"/>
                <ellipse cx="${size*0.62}" cy="${size*0.94}" rx="${size*0.065}" ry="${size*0.05}" fill="#8D6E63"/>
            </svg>
        `;
    }

    // ===== Ah-Duo (Suzie) — dark reddish-brown hair, regal, pink/red imperial robes =====

    static createAhduoPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ahd-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#880E4F;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4A0028;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="ahd-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="ahd-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#D81B60;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#880E4F;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (dark reddish-brown, elaborate imperial updo) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.28}" ry="${size*0.15}" fill="url(#ahd-hair-${size})"/>
                <!-- Tall updo (regal consort style) -->
                <ellipse cx="${size*0.5}" cy="${size*0.04}" rx="${size*0.10}" ry="${size*0.08}" fill="url(#ahd-hair-${size})"/>
                <!-- Side wing-like hair sweeps -->
                <ellipse cx="${size*0.22}" cy="${size*0.18}" rx="${size*0.08}" ry="${size*0.06}" fill="url(#ahd-hair-${size})" transform="rotate(-15 ${size*0.22} ${size*0.18})"/>
                <ellipse cx="${size*0.78}" cy="${size*0.18}" rx="${size*0.08}" ry="${size*0.06}" fill="url(#ahd-hair-${size})" transform="rotate(15 ${size*0.78} ${size*0.18})"/>

                <!-- Gold crown ornament -->
                <rect x="${size*0.40}" y="${size*0.00}" width="${size*0.20}" height="${size*0.035}" rx="${size*0.01}" fill="#FFD700"/>
                <circle cx="${size*0.50}" cy="${size*0.00}" r="${size*0.02}" fill="#FF5252"/>
                <!-- Side gold pins -->
                <circle cx="${size*0.28}" cy="${size*0.14}" r="${size*0.015}" fill="#FFD700"/>
                <circle cx="${size*0.72}" cy="${size*0.14}" r="${size*0.015}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#ahd-face-${size})"/>

                <!-- Eyes (sharp, confident — dark reddish-brown) -->
                <ellipse cx="${size*0.38}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.07}" fill="#E91E63"/>
                <ellipse cx="${size*0.62}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.07}" fill="#E91E63"/>
                <circle cx="${size*0.38}" cy="${size*0.33}" r="${size*0.028}" fill="#880E4F"/>
                <circle cx="${size*0.62}" cy="${size*0.33}" r="${size*0.028}" fill="#880E4F"/>
                <circle cx="${size*0.40}" cy="${size*0.31}" r="${size*0.013}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.31}" r="${size*0.013}" fill="#FFF"/>

                <!-- Confident smile -->
                <path d="M ${size*0.42} ${size*0.48} Q ${size*0.5} ${size*0.53} ${size*0.58} ${size*0.48}" stroke="#AD1457" stroke-width="${size*0.016}" fill="none" stroke-linecap="round"/>

                <!-- Body (rich pink/crimson imperial robe) -->
                <path d="M ${size*0.30} ${size*0.56} Q ${size*0.5} ${size*0.53} ${size*0.70} ${size*0.56} L ${size*0.76} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.24} ${size*0.90} Z" fill="url(#ahd-robe-${size})"/>

                <!-- Gold collar/trim -->
                <path d="M ${size*0.36} ${size*0.56} L ${size*0.5} ${size*0.66} L ${size*0.64} ${size*0.56}" stroke="#FFD700" stroke-width="${size*0.025}" fill="none" stroke-linecap="round"/>

                <!-- Elaborate gold sash -->
                <rect x="${size*0.28}" y="${size*0.73}" width="${size*0.44}" height="${size*0.04}" rx="${size*0.01}" fill="#FFD700" opacity="0.75"/>
                <circle cx="${size*0.42}" cy="${size*0.75}" r="${size*0.012}" fill="#FF5252"/>
                <circle cx="${size*0.58}" cy="${size*0.75}" r="${size*0.012}" fill="#FF5252"/>

                <!-- Arms -->
                <ellipse cx="${size*0.16}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>
                <ellipse cx="${size*0.84}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFF8E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#4A0028"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#4A0028"/>
            </svg>
        `;
    }

    // ===== Xiaolan (Bree) — dark hair, green bow/ribbon, big brown eyes, cheerful maid =====

    static createXiaolanPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xiao-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#5D4037;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="xiao-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFECB3;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFE0B2;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="xiao-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#FFAB91;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FF7043;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (dark brown, neat, with bangs) -->
                <ellipse cx="${size*0.5}" cy="${size*0.18}" rx="${size*0.26}" ry="${size*0.15}" fill="url(#xiao-hair-${size})"/>
                <!-- Short side hair -->
                <rect x="${size*0.25}" y="${size*0.20}" width="${size*0.08}" height="${size*0.22}" rx="${size*0.03}" fill="url(#xiao-hair-${size})"/>
                <rect x="${size*0.67}" y="${size*0.20}" width="${size*0.08}" height="${size*0.22}" rx="${size*0.03}" fill="url(#xiao-hair-${size})"/>

                <!-- Green hair bow (Xiaolan's signature!) -->
                <path d="M ${size*0.42} ${size*0.10} Q ${size*0.38} ${size*0.04} ${size*0.44} ${size*0.06} L ${size*0.50} ${size*0.10} L ${size*0.56} ${size*0.06} Q ${size*0.62} ${size*0.04} ${size*0.58} ${size*0.10}" fill="#4CAF50"/>
                <circle cx="${size*0.50}" cy="${size*0.10}" r="${size*0.02}" fill="#388E3C"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#xiao-face-${size})"/>

                <!-- Eyes (big, round, warm brown — cheerful) -->
                <ellipse cx="${size*0.38}" cy="${size*0.36}" rx="${size*0.06}" ry="${size*0.08}" fill="#A1887F"/>
                <ellipse cx="${size*0.62}" cy="${size*0.36}" rx="${size*0.06}" ry="${size*0.08}" fill="#A1887F"/>
                <circle cx="${size*0.38}" cy="${size*0.35}" r="${size*0.03}" fill="#4E342E"/>
                <circle cx="${size*0.62}" cy="${size*0.35}" r="${size*0.03}" fill="#4E342E"/>
                <circle cx="${size*0.40}" cy="${size*0.33}" r="${size*0.014}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.33}" r="${size*0.014}" fill="#FFF"/>

                <!-- Big happy smile -->
                <path d="M ${size*0.40} ${size*0.49} Q ${size*0.5} ${size*0.57} ${size*0.60} ${size*0.49}" stroke="#D84315" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.27}" cy="${size*0.43}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.73}" cy="${size*0.43}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (orange maid robe) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.74} ${size*0.88} Q ${size*0.5} ${size*0.92} ${size*0.26} ${size*0.88} Z" fill="url(#xiao-robe-${size})"/>

                <!-- White collar -->
                <path d="M ${size*0.38} ${size*0.57} L ${size*0.5} ${size*0.64} L ${size*0.62} ${size*0.57}" stroke="#FFF" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- White apron -->
                <path d="M ${size*0.38} ${size*0.65} L ${size*0.38} ${size*0.85} Q ${size*0.5} ${size*0.88} ${size*0.62} ${size*0.85} L ${size*0.62} ${size*0.65}" fill="#FFF3E0" opacity="0.5"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>
                <ellipse cx="${size*0.82}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFECB3"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
            </svg>
        `;
    }

    // ===== Lakan (Seth) — dark hair, tanned skin, confident grin, military garb =====

    static createLakanPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="lak-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#4E342E;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#2C1810;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lak-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFCC80;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFB74D;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lak-robe-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#6D8B74;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4A6B52;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (short-ish dark brown, slightly messy, sideswept) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#lak-hair-${size})"/>
                <!-- Messy spikes on top -->
                <path d="M ${size*0.34} ${size*0.08} L ${size*0.38} ${size*0.02} L ${size*0.42} ${size*0.07}" fill="url(#lak-hair-${size})"/>
                <path d="M ${size*0.46} ${size*0.06} L ${size*0.50} ${size*0.01} L ${size*0.54} ${size*0.06}" fill="url(#lak-hair-${size})"/>
                <path d="M ${size*0.56} ${size*0.07} L ${size*0.60} ${size*0.02} L ${size*0.64} ${size*0.08}" fill="url(#lak-hair-${size})"/>

                <!-- Head (slightly tanned) -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#lak-face-${size})"/>

                <!-- Eyes (sharp, confident, dark — slight fox-like squint) -->
                <ellipse cx="${size*0.38}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.06}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.06}" fill="#5D4037"/>
                <circle cx="${size*0.38}" cy="${size*0.34}" r="${size*0.025}" fill="#1a1a1a"/>
                <circle cx="${size*0.62}" cy="${size*0.34}" r="${size*0.025}" fill="#1a1a1a"/>
                <circle cx="${size*0.40}" cy="${size*0.33}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.33}" r="${size*0.012}" fill="#FFF"/>

                <!-- Confident grin -->
                <path d="M ${size*0.39} ${size*0.48} Q ${size*0.5} ${size*0.55} ${size*0.61} ${size*0.48}" stroke="#5D4037" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Body (olive/green military-style garb) -->
                <path d="M ${size*0.32} ${size*0.56} Q ${size*0.5} ${size*0.53} ${size*0.68} ${size*0.56} L ${size*0.74} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.26} ${size*0.90} Z" fill="url(#lak-robe-${size})"/>

                <!-- Collar (V-neck, dark trim) -->
                <path d="M ${size*0.36} ${size*0.57} L ${size*0.5} ${size*0.66} L ${size*0.64} ${size*0.57}" stroke="#3E2723" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Belt -->
                <rect x="${size*0.30}" y="${size*0.73}" width="${size*0.40}" height="${size*0.035}" rx="${size*0.01}" fill="#3E2723" opacity="0.8"/>
                <!-- Belt buckle -->
                <rect x="${size*0.47}" y="${size*0.725}" width="${size*0.06}" height="${size*0.04}" rx="${size*0.008}" fill="#FFD700" opacity="0.7"/>

                <!-- Arms (tanned skin) -->
                <ellipse cx="${size*0.18}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFCC80"/>
                <ellipse cx="${size*0.82}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFCC80"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#3E2723"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#3E2723"/>
            </svg>
        `;
    }
}
