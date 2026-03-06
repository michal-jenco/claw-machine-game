// Plushie SVG Generator - Creates cute SVG plushies similar to Miku
class PlushieFactory {
    static createPlushieSVG(type, size = 30) {
        const viewBox = `0 0 ${size} ${size}`;

        switch(type) {
            case 'miku':
                return this.createMikuPlushie(size);
            case 'teto':
                return this.createTetoPlushie(size);
            case 'melody':
                return this.createMelodyPlushie(size);
            case 'kuromi':
                return this.createKuromiPlushie(size);
            case 'kitty':
                return this.createKittyPlushie(size);
            case 'angel':
                return this.createAngelPlushie(size);
            case 'sakura':
                return this.createSakuraPlushie(size);
            case 'purple':
                return this.createPurplePlushie(size);
            case 'ribbon':
                return this.createRibbonPlushie(size);
            case 'star':
                return this.createStarPlushie(size);
            default:
                return this.createMikuPlushie(size);
        }
    }

    static createMikuPlushie(size) {
        const s = size / 30; // Scale factor
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="miku-hair-grad-${size}" cx="40%" cy="30%">
                        <stop offset="0%" style="stop-color:#00E5FF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00ACC1;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="miku-face-grad-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (twintails) -->
                <ellipse cx="${size*0.15}" cy="${size*0.2}" rx="${size*0.12}" ry="${size*0.25}" fill="url(#miku-hair-grad-${size})"/>
                <ellipse cx="${size*0.85}" cy="${size*0.2}" rx="${size*0.12}" ry="${size*0.25}" fill="url(#miku-hair-grad-${size})"/>

                <!-- Main hair -->
                <ellipse cx="${size*0.5}" cy="${size*0.15}" rx="${size*0.3}" ry="${size*0.2}" fill="url(#miku-hair-grad-${size})"/>

                <!-- Hair accessories (pink bows) -->
                <rect x="${size*0.08}" y="${size*0.08}" width="${size*0.08}" height="${size*0.08}" fill="#FF1493" rx="${size*0.02}"/>
                <rect x="${size*0.84}" y="${size*0.08}" width="${size*0.08}" height="${size*0.08}" fill="#FF1493" rx="${size*0.02}"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.45}" r="${size*0.25}" fill="url(#miku-face-grad-${size})"/>

                <!-- Eyes -->
                <ellipse cx="${size*0.35}" cy="${size*0.4}" rx="${size*0.08}" ry="${size*0.12}" fill="#00CC99"/>
                <ellipse cx="${size*0.65}" cy="${size*0.4}" rx="${size*0.08}" ry="${size*0.12}" fill="#00CC99"/>
                <circle cx="${size*0.35}" cy="${size*0.38}" r="${size*0.04}" fill="#000"/>
                <circle cx="${size*0.65}" cy="${size*0.38}" r="${size*0.04}" fill="#000"/>
                <circle cx="${size*0.37}" cy="${size*0.36}" r="${size*0.015}" fill="#FFF"/>
                <circle cx="${size*0.67}" cy="${size*0.36}" r="${size*0.015}" fill="#FFF"/>

                <!-- Smile -->
                <path d="M ${size*0.4} ${size*0.55} Q ${size*0.5} ${size*0.62} ${size*0.6} ${size*0.55}" stroke="#FF1493" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Body (dress) -->
                <ellipse cx="${size*0.5}" cy="${size*0.75}" rx="${size*0.22}" ry="${size*0.28}" fill="#00E5FF"/>
                <path d="M ${size*0.28} ${size*0.65} L ${size*0.25} ${size*0.95} L ${size*0.75} ${size*0.95} L ${size*0.72} ${size*0.65}" fill="#1a1a2e" opacity="0.8"/>

                <!-- Dress details -->
                <circle cx="${size*0.5}" cy="${size*0.68}" r="${size*0.08}" fill="#FF1493" opacity="0.6"/>

                <!-- Arms -->
                <ellipse cx="${size*0.12}" cy="${size*0.7}" rx="${size*0.08}" ry="${size*0.15}" fill="#FFFACD"/>
                <ellipse cx="${size*0.88}" cy="${size*0.7}" rx="${size*0.08}" ry="${size*0.15}" fill="#FFFACD"/>

                <!-- Hands -->
                <circle cx="${size*0.08}" cy="${size*0.88}" r="${size*0.06}" fill="#FFFACD"/>
                <circle cx="${size*0.92}" cy="${size*0.88}" r="${size*0.06}" fill="#FFFACD"/>

                <!-- Legs/feet -->
                <ellipse cx="${size*0.35}" cy="${size*0.95}" rx="${size*0.08}" ry="${size*0.12}" fill="#00E5FF"/>
                <ellipse cx="${size*0.65}" cy="${size*0.95}" rx="${size*0.08}" ry="${size*0.12}" fill="#00E5FF"/>

                <!-- Blush -->
                <circle cx="${size*0.22}" cy="${size*0.48}" r="${size*0.05}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.78}" cy="${size*0.48}" r="${size*0.05}" fill="#FFB6E1" opacity="0.6"/>
            </svg>
        `;
    }

    static createTetoPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="teto-hair-grad-${size}">
                        <stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C92A2A;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="teto-face-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (twintails) -->
                <ellipse cx="${size*0.15}" cy="${size*0.2}" rx="${size*0.1}" ry="${size*0.23}" fill="url(#teto-hair-grad-${size})"/>
                <ellipse cx="${size*0.85}" cy="${size*0.2}" rx="${size*0.1}" ry="${size*0.23}" fill="url(#teto-hair-grad-${size})"/>

                <!-- Main hair -->
                <ellipse cx="${size*0.5}" cy="${size*0.15}" rx="${size*0.28}" ry="${size*0.18}" fill="url(#teto-hair-grad-${size})"/>

                <!-- Hair tips (blonde) -->
                <polygon points="${size*0.15},${size*0.43} ${size*0.1},${size*0.5} ${size*0.2},${size*0.48}" fill="#FFD700"/>
                <polygon points="${size*0.85},${size*0.43} ${size*0.9},${size*0.5} ${size*0.8},${size*0.48}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.45}" r="${size*0.24}" fill="url(#teto-face-grad-${size})"/>

                <!-- Eyes -->
                <ellipse cx="${size*0.35}" cy="${size*0.4}" rx="${size*0.07}" ry="${size*0.1}" fill="#FFD700"/>
                <ellipse cx="${size*0.65}" cy="${size*0.4}" rx="${size*0.07}" ry="${size*0.1}" fill="#FFD700"/>
                <circle cx="${size*0.35}" cy="${size*0.39}" r="${size*0.035}" fill="#000"/>
                <circle cx="${size*0.65}" cy="${size*0.39}" r="${size*0.035}" fill="#000"/>

                <!-- Smile -->
                <path d="M ${size*0.38} ${size*0.54} Q ${size*0.5} ${size*0.6} ${size*0.62} ${size*0.54}" stroke="#C92A2A" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.75}" rx="${size*0.2}" ry="${size*0.26}" fill="#FF6B9D"/>

                <!-- Arms -->
                <ellipse cx="${size*0.12}" cy="${size*0.7}" rx="${size*0.07}" ry="${size*0.14}" fill="#FFFACD"/>
                <ellipse cx="${size*0.88}" cy="${size*0.7}" rx="${size*0.07}" ry="${size*0.14}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.35}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.1}" fill="#FFD700"/>
                <ellipse cx="${size*0.65}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.1}" fill="#FFD700"/>

                <!-- Blush -->
                <circle cx="${size*0.22}" cy="${size*0.48}" r="${size*0.045}" fill="#FFB6E1" opacity="0.7"/>
                <circle cx="${size*0.78}" cy="${size*0.48}" r="${size*0.045}" fill="#FFB6E1" opacity="0.7"/>
            </svg>
        `;
    }

    static createMelodyPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="melody-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFB6E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.6}" rx="${size*0.25}" ry="${size*0.3}" fill="url(#melody-grad-${size})"/>

                <!-- Ears -->
                <ellipse cx="${size*0.25}" cy="${size*0.2}" rx="${size*0.1}" ry="${size*0.18}" fill="url(#melody-grad-${size})"/>
                <ellipse cx="${size*0.75}" cy="${size*0.2}" rx="${size*0.1}" ry="${size*0.18}" fill="url(#melody-grad-${size})"/>

                <!-- Inner ears -->
                <ellipse cx="${size*0.25}" cy="${size*0.25}" rx="${size*0.05}" ry="${size*0.1}" fill="#FFF"/>
                <ellipse cx="${size*0.75}" cy="${size*0.25}" rx="${size*0.05}" ry="${size*0.1}" fill="#FFF"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.35}" r="${size*0.2}" fill="url(#melody-grad-${size})"/>

                <!-- Eyes -->
                <circle cx="${size*0.38}" cy="${size*0.3}" r="${size*0.06}" fill="#000"/>
                <circle cx="${size*0.62}" cy="${size*0.3}" r="${size*0.06}" fill="#000"/>
                <circle cx="${size*0.4}" cy="${size*0.28}" r="${size*0.02}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.28}" r="${size*0.02}" fill="#FFF"/>

                <!-- Bow -->
                <ellipse cx="${size*0.5}" cy="${size*0.1}" rx="${size*0.12}" ry="${size*0.08}" fill="#FF1493"/>
                <circle cx="${size*0.4}" cy="${size*0.08}" r="${size*0.05}" fill="#FF1493"/>
                <circle cx="${size*0.6}" cy="${size*0.08}" r="${size*0.05}" fill="#FF1493"/>

                <!-- Mouth -->
                <path d="M ${size*0.42} ${size*0.42} Q ${size*0.5} ${size*0.48} ${size*0.58} ${size*0.42}" stroke="#FFF" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.25}" cy="${size*0.38}" r="${size*0.05}" fill="#FFF" opacity="0.7"/>
                <circle cx="${size*0.75}" cy="${size*0.38}" r="${size*0.05}" fill="#FFF" opacity="0.7"/>

                <!-- Feet -->
                <ellipse cx="${size*0.35}" cy="${size*0.92}" rx="${size*0.08}" ry="${size*0.12}" fill="url(#melody-grad-${size})"/>
                <ellipse cx="${size*0.65}" cy="${size*0.92}" rx="${size*0.08}" ry="${size*0.12}" fill="url(#melody-grad-${size})"/>
            </svg>
        `;
    }

    static createKuromiPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="kuromi-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#F0F0F0;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.65}" rx="${size*0.24}" ry="${size*0.28}" fill="url(#kuromi-grad-${size})"/>

                <!-- Ears -->
                <ellipse cx="${size*0.2}" cy="${size*0.15}" rx="${size*0.12}" ry="${size*0.2}" fill="url(#kuromi-grad-${size})"/>
                <ellipse cx="${size*0.8}" cy="${size*0.15}" rx="${size*0.12}" ry="${size*0.2}" fill="url(#kuromi-grad-${size})"/>

                <!-- Devil horns -->
                <polygon points="${size*0.15},${size*0.05} ${size*0.12},${size*0.02} ${size*0.18},${size*0.1}" fill="#C0C0C0"/>
                <polygon points="${size*0.85},${size*0.05} ${size*0.88},${size*0.02} ${size*0.82},${size*0.1}" fill="#C0C0C0"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.35}" r="${size*0.22}" fill="url(#kuromi-grad-${size})"/>

                <!-- Eyes (angry) -->
                <ellipse cx="${size*0.35}" cy="${size*0.3}" rx="${size*0.06}" ry="${size*0.08}" fill="#000"/>
                <ellipse cx="${size*0.65}" cy="${size*0.3}" rx="${size*0.06}" ry="${size*0.08}" fill="#000"/>
                <circle cx="${size*0.37}" cy="${size*0.28}" r="${size*0.02}" fill="#FFF"/>
                <circle cx="${size*0.67}" cy="${size*0.28}" r="${size*0.02}" fill="#FFF"/>

                <!-- Mouth (scowl) -->
                <path d="M ${size*0.4} ${size*0.45} Q ${size*0.5} ${size*0.48} ${size*0.6} ${size*0.45}" stroke="#000" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Black mark on ear -->
                <ellipse cx="${size*0.2}" cy="${size*0.18}" rx="${size*0.06}" ry="${size*0.08}" fill="#000"/>
                <ellipse cx="${size*0.8}" cy="${size*0.18}" rx="${size*0.06}" ry="${size*0.08}" fill="#000"/>

                <!-- Feet -->
                <ellipse cx="${size*0.32}" cy="${size*0.95}" rx="${size*0.08}" ry="${size*0.1}" fill="url(#kuromi-grad-${size})"/>
                <ellipse cx="${size*0.68}" cy="${size*0.95}" rx="${size*0.08}" ry="${size*0.1}" fill="url(#kuromi-grad-${size})"/>
            </svg>
        `;
    }

    static createKittyPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="kitty-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFE4E1;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.65}" rx="${size*0.22}" ry="${size*0.27}" fill="url(#kitty-grad-${size})"/>

                <!-- Ears -->
                <polygon points="${size*0.28},${size*0.18} ${size*0.22},${size*0.02} ${size*0.35},${size*0.15}" fill="url(#kitty-grad-${size})"/>
                <polygon points="${size*0.72},${size*0.18} ${size*0.78},${size*0.02} ${size*0.65},${size*0.15}" fill="url(#kitty-grad-${size})"/>

                <!-- Inner ears -->
                <polygon points="${size*0.28},${size*0.18} ${size*0.25},${size*0.08} ${size*0.32},${size*0.14}" fill="#FFB6E1"/>
                <polygon points="${size*0.72},${size*0.18} ${size*0.75},${size*0.08} ${size*0.68},${size*0.14}" fill="#FFB6E1"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.35}" r="${size*0.21}" fill="url(#kitty-grad-${size})"/>

                <!-- Eyes -->
                <circle cx="${size*0.38}" cy="${size*0.31}" r="${size*0.05}" fill="#000"/>
                <circle cx="${size*0.62}" cy="${size*0.31}" r="${size*0.05}" fill="#000"/>
                <circle cx="${size*0.4}" cy="${size*0.29}" r="${size*0.015}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.29}" r="${size*0.015}" fill="#FFF"/>

                <!-- Nose -->
                <circle cx="${size*0.5}" cy="${size*0.42}" r="${size*0.03}" fill="#FF69B4"/>

                <!-- Mouth -->
                <line x1="${size*0.5}" y1="${size*0.42}" x2="${size*0.5}" y2="${size*0.5}" stroke="#000" stroke-width="${size*0.015}"/>
                <path d="M ${size*0.42} ${size*0.5} Q ${size*0.5} ${size*0.53} ${size*0.58} ${size*0.5}" stroke="#000" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Bow -->
                <circle cx="${size*0.28}" cy="${size*0.1}" r="${size*0.04}" fill="#FFB6E1"/>
                <circle cx="${size*0.72}" cy="${size*0.1}" r="${size*0.04}" fill="#FFB6E1"/>

                <!-- Feet -->
                <ellipse cx="${size*0.32}" cy="${size*0.93}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#kitty-grad-${size})"/>
                <ellipse cx="${size*0.68}" cy="${size*0.93}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#kitty-grad-${size})"/>
            </svg>
        `;
    }

    static createAngelPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="angel-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFE4FF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFB6E1;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Halo -->
                <circle cx="${size*0.5}" cy="${size*0.08}" r="${size*0.1}" fill="none" stroke="#FFD700" stroke-width="${size*0.015}"/>

                <!-- Wings -->
                <ellipse cx="${size*0.15}" cy="${size*0.4}" rx="${size*0.08}" ry="${size*0.18}" fill="#FFE4FF" opacity="0.7"/>
                <ellipse cx="${size*0.85}" cy="${size*0.4}" rx="${size*0.08}" ry="${size*0.18}" fill="#FFE4FF" opacity="0.7"/>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.65}" rx="${size*0.23}" ry="${size*0.28}" fill="url(#angel-grad-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.32}" r="${size*0.2}" fill="url(#angel-grad-${size})"/>

                <!-- Eyes -->
                <ellipse cx="${size*0.36}" cy="${size*0.28}" rx="${size*0.06}" ry="${size*0.08}" fill="#87CEEB"/>
                <ellipse cx="${size*0.64}" cy="${size*0.28}" rx="${size*0.06}" ry="${size*0.08}" fill="#87CEEB"/>
                <circle cx="${size*0.36}" cy="${size*0.28}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.64}" cy="${size*0.28}" r="${size*0.03}" fill="#000"/>

                <!-- Smile (gentle) -->
                <path d="M ${size*0.4} ${size*0.42} Q ${size*0.5} ${size*0.48} ${size*0.6} ${size*0.42}" stroke="#FFB6E1" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Star marks -->
                <polygon points="${size*0.2},${size*0.3} ${size*0.22},${size*0.35} ${size*0.27},${size*0.35} ${size*0.23},${size*0.39} ${size*0.25},${size*0.44} ${size*0.2},${size*0.4} ${size*0.15},${size*0.44} ${size*0.17},${size*0.39} ${size*0.13},${size*0.35} ${size*0.18},${size*0.35}" fill="#FFD700"/>
                <polygon points="${size*0.8},${size*0.3} ${size*0.82},${size*0.35} ${size*0.87},${size*0.35} ${size*0.83},${size*0.39} ${size*0.85},${size*0.44} ${size*0.8},${size*0.4} ${size*0.75},${size*0.44} ${size*0.77},${size*0.39} ${size*0.73},${size*0.35} ${size*0.78},${size*0.35}" fill="#FFD700"/>

                <!-- Feet -->
                <ellipse cx="${size*0.35}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#angel-grad-${size})"/>
                <ellipse cx="${size*0.65}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#angel-grad-${size})"/>
            </svg>
        `;
    }

    static createSakuraPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="sakura-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFE4FF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFB6E1;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="sakura-hair-${size}">
                        <stop offset="0%" style="stop-color:#FFC0CB;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair -->
                <ellipse cx="${size*0.5}" cy="${size*0.18}" rx="${size*0.25}" ry="${size*0.15}" fill="url(#sakura-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.35}" r="${size*0.2}" fill="url(#sakura-grad-${size})"/>

                <!-- Eyes (shy) -->
                <path d="M ${size*0.35} ${size*0.32} Q ${size*0.35} ${size*0.35} ${size*0.38} ${size*0.33}" stroke="#000" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>
                <path d="M ${size*0.65} ${size*0.32} Q ${size*0.65} ${size*0.35} ${size*0.62} ${size*0.33}" stroke="#000" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Blush (big) -->
                <circle cx="${size*0.2}" cy="${size*0.4}" r="${size*0.08}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.8}" cy="${size*0.4}" r="${size*0.08}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.65}" rx="${size*0.22}" ry="${size*0.26}" fill="url(#sakura-grad-${size})"/>

                <!-- Flower on head -->
                <circle cx="${size*0.25}" cy="${size*0.15}" r="${size*0.05}" fill="#FF1493"/>
                <circle cx="${size*0.3}" cy="${size*0.12}" r="${size*0.04}" fill="#FF69B4"/>
                <circle cx="${size*0.2}" cy="${size*0.12}" r="${size*0.04}" fill="#FF69B4"/>

                <!-- Feet -->
                <ellipse cx="${size*0.32}" cy="${size*0.93}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#sakura-grad-${size})"/>
                <ellipse cx="${size*0.68}" cy="${size*0.93}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#sakura-grad-${size})"/>
            </svg>
        `;
    }

    static createPurplePlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="purple-grad-${size}">
                        <stop offset="0%" style="stop-color:#E6B3FF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#B366FF;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Body (round) -->
                <circle cx="${size*0.5}" cy="${size*0.55}" r="${size*0.28}" fill="url(#purple-grad-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.28}" r="${size*0.22}" fill="url(#purple-grad-${size})"/>

                <!-- Eyes (happy) -->
                <ellipse cx="${size*0.36}" cy="${size*0.24}" rx="${size*0.05}" ry="${size*0.07}" fill="#FFF"/>
                <ellipse cx="${size*0.64}" cy="${size*0.24}" rx="${size*0.05}" ry="${size*0.07}" fill="#FFF"/>
                <circle cx="${size*0.36}" cy="${size*0.26}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.64}" cy="${size*0.26}" r="${size*0.03}" fill="#000"/>

                <!-- Smile (big) -->
                <path d="M ${size*0.38} ${size*0.36} Q ${size*0.5} ${size*0.42} ${size*0.62} ${size*0.36}" stroke="#000" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Ears -->
                <circle cx="${size*0.22}" cy="${size*0.12}" r="${size*0.08}" fill="url(#purple-grad-${size})"/>
                <circle cx="${size*0.78}" cy="${size*0.12}" r="${size*0.08}" fill="url(#purple-grad-${size})"/>

                <!-- Cheeks -->
                <circle cx="${size*0.18}" cy="${size*0.3}" r="${size*0.06}" fill="#FF69B4" opacity="0.5"/>
                <circle cx="${size*0.82}" cy="${size*0.3}" r="${size*0.06}" fill="#FF69B4" opacity="0.5"/>

                <!-- Feet -->
                <ellipse cx="${size*0.32}" cy="${size*0.88}" rx="${size*0.08}" ry="${size*0.12}" fill="url(#purple-grad-${size})"/>
                <ellipse cx="${size*0.68}" cy="${size*0.88}" rx="${size*0.08}" ry="${size*0.12}" fill="url(#purple-grad-${size})"/>
            </svg>
        `;
    }

    static createRibbonPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ribbon-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFE4E1;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Ribbons (decorative) -->
                <path d="M ${size*0.2} ${size*0.1} Q ${size*0.15} ${size*0.25} ${size*0.22} ${size*0.35}" stroke="#FF69B4" stroke-width="${size*0.04}" fill="none" stroke-linecap="round"/>
                <path d="M ${size*0.8} ${size*0.1} Q ${size*0.85} ${size*0.25} ${size*0.78} ${size*0.35}" stroke="#FF69B4" stroke-width="${size*0.04}" fill="none" stroke-linecap="round"/>

                <!-- Body -->
                <ellipse cx="${size*0.5}" cy="${size*0.62}" rx="${size*0.23}" ry="${size*0.27}" fill="url(#ribbon-grad-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.32}" r="${size*0.2}" fill="url(#ribbon-grad-${size})"/>

                <!-- Eyes (round) -->
                <circle cx="${size*0.37}" cy="${size*0.28}" r="${size*0.05}" fill="#FFB6E1" opacity="0.8"/>
                <circle cx="${size*0.63}" cy="${size*0.28}" r="${size*0.05}" fill="#FFB6E1" opacity="0.8"/>
                <circle cx="${size*0.37}" cy="${size*0.28}" r="${size*0.025}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.28}" r="${size*0.025}" fill="#000"/>

                <!-- Mouth (happy) -->
                <path d="M ${size*0.4} ${size*0.4} Q ${size*0.5} ${size*0.45} ${size*0.6} ${size*0.4}" stroke="#FF69B4" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Central bow -->
                <ellipse cx="${size*0.5}" cy="${size*0.48}" rx="${size*0.15}" ry="${size*0.12}" fill="#FF69B4"/>
                <circle cx="${size*0.38}" cy="${size*0.46}" r="${size*0.06}" fill="#FF69B4"/>
                <circle cx="${size*0.62}" cy="${size*0.46}" r="${size*0.06}" fill="#FF69B4"/>

                <!-- Feet -->
                <ellipse cx="${size*0.32}" cy="${size*0.92}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#ribbon-grad-${size})"/>
                <ellipse cx="${size*0.68}" cy="${size*0.92}" rx="${size*0.07}" ry="${size*0.1}" fill="url(#ribbon-grad-${size})"/>
            </svg>
        `;
    }

    static createStarPlushie(size) {
        const s = size / 30;
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="star-grad-${size}">
                        <stop offset="0%" style="stop-color:#FFFF99;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Main star body -->
                <polygon points="${size*0.5},${size*0.1} ${size*0.61},${size*0.35} ${size*0.88},${size*0.4} ${size*0.69},${size*0.57} ${size*0.75},${size*0.85} ${size*0.5},${size*0.68} ${size*0.25},${size*0.85} ${size*0.31},${size*0.57} ${size*0.12},${size*0.4} ${size*0.39},${size*0.35}" fill="url(#star-grad-${size})"/>

                <!-- Face -->
                <!-- Eyes -->
                <circle cx="${size*0.4}" cy="${size*0.32}" r="${size*0.05}" fill="#000"/>
                <circle cx="${size*0.6}" cy="${size*0.32}" r="${size*0.05}" fill="#000"/>
                <circle cx="${size*0.42}" cy="${size*0.3}" r="${size*0.015}" fill="#FFF"/>
                <circle cx="${size*0.62}" cy="${size*0.3}" r="${size*0.015}" fill="#FFF"/>

                <!-- Smile -->
                <path d="M ${size*0.42} ${size*0.44} Q ${size*0.5} ${size*0.5} ${size*0.58} ${size*0.44}" stroke="#000" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.25}" cy="${size*0.4}" r="${size*0.05}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.75}" cy="${size*0.4}" r="${size*0.05}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Inner sparkles -->
                <circle cx="${size*0.5}" cy="${size*0.25}" r="${size*0.03}" fill="#FFE4B5" opacity="0.8"/>
                <circle cx="${size*0.7}" cy="${size*0.55}" r="${size*0.03}" fill="#FFE4B5" opacity="0.8"/>
                <circle cx="${size*0.3}" cy="${size*0.55}" r="${size*0.03}" fill="#FFE4B5" opacity="0.8"/>
            </svg>
        `;
    }

    // Map emoji types to plushie types
    static getPrizeType(emoji) {
        const typeMap = {
            '🎵': 'miku',
            '🎶': 'teto',
            '🐰': 'melody',
            '🖤': 'kuromi',
            '💕': 'kitty',
            '✨': 'angel',
            '🌸': 'sakura',
            '💜': 'purple',
            '🎀': 'ribbon',
            '⭐': 'star'
        };
        return typeMap[emoji] || 'miku';
    }
}

