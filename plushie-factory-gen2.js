// Plushie SVG Generator — Generation 2: Anime Classics
// Characters from Azumanga Daioh, K-ON!, Lucky Star, Serial Experiments Lain
class PlushieFactoryGen2 {

    // ===== Azumanga Daioh =====

    static createChiyoPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="chiyo-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#FF8C00;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#D2691E;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="chiyo-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="chiyo-dress-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Pigtails (big round puffs — Chiyo's signature!) -->
                <circle cx="${size*0.18}" cy="${size*0.18}" r="${size*0.14}" fill="url(#chiyo-hair-${size})"/>
                <circle cx="${size*0.82}" cy="${size*0.18}" r="${size*0.14}" fill="url(#chiyo-hair-${size})"/>

                <!-- Pigtail ties (red ribbons) -->
                <circle cx="${size*0.30}" cy="${size*0.22}" r="${size*0.035}" fill="#FF1744"/>
                <circle cx="${size*0.70}" cy="${size*0.22}" r="${size*0.035}" fill="#FF1744"/>

                <!-- Main hair (bangs) -->
                <ellipse cx="${size*0.5}" cy="${size*0.2}" rx="${size*0.24}" ry="${size*0.14}" fill="url(#chiyo-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#chiyo-face-${size})"/>

                <!-- Eyes (big, round, innocent) -->
                <ellipse cx="${size*0.38}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.08}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.08}" fill="#5D4037"/>
                <circle cx="${size*0.38}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.62}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.40}" cy="${size*0.32}" r="${size*0.015}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.32}" r="${size*0.015}" fill="#FFF"/>

                <!-- Happy smile -->
                <path d="M ${size*0.42} ${size*0.48} Q ${size*0.5} ${size*0.55} ${size*0.58} ${size*0.48}" stroke="#D84315" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.26}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.74}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (yellow school dress) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.74} ${size*0.88} Q ${size*0.5} ${size*0.92} ${size*0.26} ${size*0.88} Z" fill="url(#chiyo-dress-${size})"/>

                <!-- Collar -->
                <path d="M ${size*0.38} ${size*0.58} L ${size*0.5} ${size*0.65} L ${size*0.62} ${size*0.58}" stroke="#FFF" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.82}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.06}" fill="#8B4513"/>
                <ellipse cx="${size*0.62}" cy="${size*0.94}" rx="${size*0.07}" ry="${size*0.06}" fill="#8B4513"/>
            </svg>
        `;
    }

    static createOsakaPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="osaka-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#5D4037;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="osaka-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (shoulder-length, straight) -->
                <ellipse cx="${size*0.5}" cy="${size*0.18}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#osaka-hair-${size})"/>
                <rect x="${size*0.22}" y="${size*0.18}" width="${size*0.13}" height="${size*0.35}" rx="${size*0.04}" fill="url(#osaka-hair-${size})"/>
                <rect x="${size*0.65}" y="${size*0.18}" width="${size*0.13}" height="${size*0.35}" rx="${size*0.04}" fill="url(#osaka-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#osaka-face-${size})"/>

                <!-- Eyes (sleepy half-closed — Osaka's signature!) -->
                <path d="M ${size*0.30} ${size*0.36} Q ${size*0.38} ${size*0.33} ${size*0.44} ${size*0.36}" stroke="#3E2723" stroke-width="${size*0.025}" fill="none" stroke-linecap="round"/>
                <path d="M ${size*0.56} ${size*0.36} Q ${size*0.62} ${size*0.33} ${size*0.70} ${size*0.36}" stroke="#3E2723" stroke-width="${size*0.025}" fill="none" stroke-linecap="round"/>
                <!-- Tiny pupils peeking -->
                <circle cx="${size*0.37}" cy="${size*0.36}" r="${size*0.015}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.36}" r="${size*0.015}" fill="#000"/>

                <!-- Small mouth (slightly open, dazed) -->
                <ellipse cx="${size*0.5}" cy="${size*0.50}" rx="${size*0.04}" ry="${size*0.03}" fill="#E8967A"/>

                <!-- Blush -->
                <circle cx="${size*0.28}" cy="${size*0.44}" r="${size*0.045}" fill="#FFB6E1" opacity="0.5"/>
                <circle cx="${size*0.72}" cy="${size*0.44}" r="${size*0.045}" fill="#FFB6E1" opacity="0.5"/>

                <!-- Body (school uniform — dark blue) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1A237E"/>

                <!-- Sailor collar -->
                <path d="M ${size*0.34} ${size*0.58} L ${size*0.5} ${size*0.68} L ${size*0.66} ${size*0.58}" stroke="#FFF" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>
                <line x1="${size*0.5}" y1="${size*0.62}" x2="${size*0.5}" y2="${size*0.72}" stroke="#FF1744" stroke-width="${size*0.015}"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.82}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
            </svg>
        `;
    }

    static createSakakiPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="sakaki-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0d0d1a;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="sakaki-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Long dark hair (flowing down) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.30}" ry="${size*0.16}" fill="url(#sakaki-hair-${size})"/>
                <rect x="${size*0.20}" y="${size*0.16}" width="${size*0.15}" height="${size*0.55}" rx="${size*0.05}" fill="url(#sakaki-hair-${size})"/>
                <rect x="${size*0.65}" y="${size*0.16}" width="${size*0.15}" height="${size*0.55}" rx="${size*0.05}" fill="url(#sakaki-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#sakaki-face-${size})"/>

                <!-- Eyes (calm, serious) -->
                <ellipse cx="${size*0.38}" cy="${size*0.34}" rx="${size*0.05}" ry="${size*0.07}" fill="#4A148C"/>
                <ellipse cx="${size*0.62}" cy="${size*0.34}" rx="${size*0.05}" ry="${size*0.07}" fill="#4A148C"/>
                <circle cx="${size*0.38}" cy="${size*0.33}" r="${size*0.025}" fill="#000"/>
                <circle cx="${size*0.62}" cy="${size*0.33}" r="${size*0.025}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.63}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>

                <!-- Subtle smile -->
                <path d="M ${size*0.44} ${size*0.46} L ${size*0.56} ${size*0.46}" stroke="#8D6E63" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Slight blush (she's shy about cats) -->
                <circle cx="${size*0.26}" cy="${size*0.40}" r="${size*0.035}" fill="#FFB6E1" opacity="0.4"/>
                <circle cx="${size*0.74}" cy="${size*0.40}" r="${size*0.035}" fill="#FFB6E1" opacity="0.4"/>

                <!-- Body (school uniform — dark) -->
                <path d="M ${size*0.32} ${size*0.56} Q ${size*0.5} ${size*0.52} ${size*0.68} ${size*0.56} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1A237E"/>

                <!-- Tiny cat silhouette on shoulder (cat lover!) -->
                <g transform="translate(${size*0.72}, ${size*0.54}) scale(${size*0.0012})">
                    <path d="M0,20 Q5,0 10,5 Q15,0 20,5 L20,20 Q10,25 0,20 Z" fill="#888" opacity="0.6"/>
                    <polygon points="1,8 0,0 5,5" fill="#888" opacity="0.6"/>
                    <polygon points="19,8 20,0 15,5" fill="#888" opacity="0.6"/>
                </g>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.13}" fill="#FFFACD"/>
                <ellipse cx="${size*0.82}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.13}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
            </svg>
        `;
    }

    static createTomoPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="tomo-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#5D4037;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4E342E;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="tomo-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Spiky wild hair (Tomo's energetic look!) -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#tomo-hair-${size})"/>
                <!-- Spiky tufts -->
                <polygon points="${size*0.22},${size*0.12} ${size*0.15},${size*0.02} ${size*0.28},${size*0.10}" fill="url(#tomo-hair-${size})"/>
                <polygon points="${size*0.38},${size*0.07} ${size*0.35},${size*0.00} ${size*0.44},${size*0.06}" fill="url(#tomo-hair-${size})"/>
                <polygon points="${size*0.56},${size*0.07} ${size*0.55},${size*0.00} ${size*0.62},${size*0.06}" fill="url(#tomo-hair-${size})"/>
                <polygon points="${size*0.72},${size*0.12} ${size*0.78},${size*0.02} ${size*0.85},${size*0.10}" fill="url(#tomo-hair-${size})"/>

                <!-- Side hair -->
                <rect x="${size*0.22}" y="${size*0.18}" width="${size*0.10}" height="${size*0.25}" rx="${size*0.03}" fill="url(#tomo-hair-${size})"/>
                <rect x="${size*0.68}" y="${size*0.18}" width="${size*0.10}" height="${size*0.25}" rx="${size*0.03}" fill="url(#tomo-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#tomo-face-${size})"/>

                <!-- Eyes (wide, mischievous) -->
                <ellipse cx="${size*0.37}" cy="${size*0.35}" rx="${size*0.065}" ry="${size*0.08}" fill="#5D4037"/>
                <ellipse cx="${size*0.63}" cy="${size*0.35}" rx="${size*0.065}" ry="${size*0.08}" fill="#5D4037"/>
                <circle cx="${size*0.37}" cy="${size*0.34}" r="${size*0.035}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.34}" r="${size*0.035}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.32}" r="${size*0.014}" fill="#FFF"/>
                <circle cx="${size*0.65}" cy="${size*0.32}" r="${size*0.014}" fill="#FFF"/>

                <!-- Big grin -->
                <path d="M ${size*0.36} ${size*0.48} Q ${size*0.5} ${size*0.58} ${size*0.64} ${size*0.48}" stroke="#D84315" stroke-width="${size*0.02}" fill="#FFF" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.24}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.76}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (school uniform) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.54} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1A237E"/>

                <!-- Sailor collar -->
                <path d="M ${size*0.35} ${size*0.58} L ${size*0.5} ${size*0.66} L ${size*0.65} ${size*0.58}" stroke="#FFF" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Arms (one raised — energetic pose!) -->
                <ellipse cx="${size*0.15}" cy="${size*0.62}" rx="${size*0.07}" ry="${size*0.13}" fill="#FFFACD" transform="rotate(-20 ${size*0.15} ${size*0.62})"/>
                <ellipse cx="${size*0.85}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
            </svg>
        `;
    }

    static createYomiPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="yomi-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#4E342E;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="yomi-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (short, neat — shoulder length) -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.27}" ry="${size*0.15}" fill="url(#yomi-hair-${size})"/>
                <rect x="${size*0.23}" y="${size*0.17}" width="${size*0.12}" height="${size*0.35}" rx="${size*0.04}" fill="url(#yomi-hair-${size})"/>
                <rect x="${size*0.65}" y="${size*0.17}" width="${size*0.12}" height="${size*0.35}" rx="${size*0.04}" fill="url(#yomi-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#yomi-face-${size})"/>

                <!-- Glasses (Yomi's signature!) -->
                <rect x="${size*0.28}" y="${size*0.30}" width="${size*0.17}" height="${size*0.12}" rx="${size*0.03}" fill="none" stroke="#666" stroke-width="${size*0.015}"/>
                <rect x="${size*0.55}" y="${size*0.30}" width="${size*0.17}" height="${size*0.12}" rx="${size*0.03}" fill="none" stroke="#666" stroke-width="${size*0.015}"/>
                <line x1="${size*0.45}" y1="${size*0.36}" x2="${size*0.55}" y2="${size*0.36}" stroke="#666" stroke-width="${size*0.012}"/>

                <!-- Eyes (behind glasses) -->
                <ellipse cx="${size*0.37}" cy="${size*0.36}" rx="${size*0.04}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.63}" cy="${size*0.36}" rx="${size*0.04}" ry="${size*0.05}" fill="#5D4037"/>
                <circle cx="${size*0.37}" cy="${size*0.35}" r="${size*0.02}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.35}" r="${size*0.02}" fill="#000"/>

                <!-- Composed smile -->
                <path d="M ${size*0.43} ${size*0.49} Q ${size*0.5} ${size*0.53} ${size*0.57} ${size*0.49}" stroke="#8D6E63" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Body (school uniform) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.55} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1A237E"/>

                <!-- Sailor collar -->
                <path d="M ${size*0.35} ${size*0.58} L ${size*0.5} ${size*0.66} L ${size*0.65} ${size*0.58}" stroke="#FFF" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>
                <line x1="${size*0.5}" y1="${size*0.62}" x2="${size*0.5}" y2="${size*0.70}" stroke="#FF1744" stroke-width="${size*0.012}"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.82}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
            </svg>
        `;
    }

    static createKaguraPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="kagura-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#5D4037;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="kagura-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFDAB9;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#F5C4A1;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Short sporty hair -->
                <ellipse cx="${size*0.5}" cy="${size*0.18}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#kagura-hair-${size})"/>

                <!-- Headband (sporty — red) -->
                <rect x="${size*0.24}" y="${size*0.14}" width="${size*0.52}" height="${size*0.04}" rx="${size*0.02}" fill="#FF1744"/>

                <!-- Side hair tufts -->
                <rect x="${size*0.22}" y="${size*0.18}" width="${size*0.10}" height="${size*0.22}" rx="${size*0.03}" fill="url(#kagura-hair-${size})"/>
                <rect x="${size*0.68}" y="${size*0.18}" width="${size*0.10}" height="${size*0.22}" rx="${size*0.03}" fill="url(#kagura-hair-${size})"/>

                <!-- Head (slightly tanned) -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#kagura-face-${size})"/>

                <!-- Eyes (confident, competitive) -->
                <ellipse cx="${size*0.37}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.08}" fill="#5D4037"/>
                <ellipse cx="${size*0.63}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.08}" fill="#5D4037"/>
                <circle cx="${size*0.37}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.32}" r="${size*0.013}" fill="#FFF"/>
                <circle cx="${size*0.65}" cy="${size*0.32}" r="${size*0.013}" fill="#FFF"/>

                <!-- Confident grin -->
                <path d="M ${size*0.38} ${size*0.48} Q ${size*0.5} ${size*0.56} ${size*0.62} ${size*0.48}" stroke="#D84315" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.25}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.5"/>
                <circle cx="${size*0.75}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.5"/>

                <!-- Body (sporty — gym uniform / red jersey) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.54} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.88} Q ${size*0.5} ${size*0.92} ${size*0.28} ${size*0.88} Z" fill="#D32F2F"/>

                <!-- Jersey number -->
                <text x="${size*0.5}" y="${size*0.78}" text-anchor="middle" font-size="${size*0.1}" font-weight="bold" fill="#FFF" font-family="monospace" opacity="0.8">3</text>

                <!-- Arms (toned) -->
                <ellipse cx="${size*0.16}" cy="${size*0.68}" rx="${size*0.08}" ry="${size*0.13}" fill="#FFDAB9"/>
                <ellipse cx="${size*0.84}" cy="${size*0.68}" rx="${size*0.08}" ry="${size*0.13}" fill="#FFDAB9"/>

                <!-- Feet (sneakers) -->
                <ellipse cx="${size*0.38}" cy="${size*0.94}" rx="${size*0.08}" ry="${size*0.06}" fill="#FFF"/>
                <ellipse cx="${size*0.62}" cy="${size*0.94}" rx="${size*0.08}" ry="${size*0.06}" fill="#FFF"/>
                <line x1="${size*0.32}" y1="${size*0.94}" x2="${size*0.44}" y2="${size*0.94}" stroke="#D32F2F" stroke-width="${size*0.008}"/>
                <line x1="${size*0.56}" y1="${size*0.94}" x2="${size*0.68}" y2="${size*0.94}" stroke="#D32F2F" stroke-width="${size*0.008}"/>
            </svg>
        `;
    }

    // ===== K-ON! =====

    static createYuiKPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="yuik-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#6D4C41;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="yuik-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Hair (medium length, slightly messy) -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.28}" ry="${size*0.16}" fill="url(#yuik-hair-${size})"/>
                <rect x="${size*0.22}" y="${size*0.17}" width="${size*0.12}" height="${size*0.30}" rx="${size*0.04}" fill="url(#yuik-hair-${size})"/>
                <rect x="${size*0.66}" y="${size*0.17}" width="${size*0.12}" height="${size*0.30}" rx="${size*0.04}" fill="url(#yuik-hair-${size})"/>

                <!-- Hair clips (yellow — Yui's hairpins!) -->
                <rect x="${size*0.30}" y="${size*0.14}" width="${size*0.06}" height="${size*0.02}" rx="${size*0.005}" fill="#FFD700"/>
                <rect x="${size*0.64}" y="${size*0.14}" width="${size*0.06}" height="${size*0.02}" rx="${size*0.005}" fill="#FFD700"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#yuik-face-${size})"/>

                <!-- Eyes (big, cheerful, sparkly) -->
                <ellipse cx="${size*0.37}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.09}" fill="#6D4C41"/>
                <ellipse cx="${size*0.63}" cy="${size*0.35}" rx="${size*0.06}" ry="${size*0.09}" fill="#6D4C41"/>
                <circle cx="${size*0.37}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.34}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.32}" r="${size*0.015}" fill="#FFF"/>
                <circle cx="${size*0.65}" cy="${size*0.32}" r="${size*0.015}" fill="#FFF"/>

                <!-- Happy open mouth -->
                <path d="M ${size*0.40} ${size*0.48} Q ${size*0.5} ${size*0.56} ${size*0.60} ${size*0.48}" stroke="#D84315" stroke-width="${size*0.018}" fill="#FFF" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.25}" cy="${size*0.42}" r="${size*0.045}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.75}" cy="${size*0.42}" r="${size*0.045}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (school blazer — blue) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.54} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1565C0"/>

                <!-- Collar / ribbon -->
                <path d="M ${size*0.42} ${size*0.58} L ${size*0.5} ${size*0.64} L ${size*0.58} ${size*0.58}" stroke="#FF1744" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>

                <!-- Guitar (Giita!) on back — simplified -->
                <ellipse cx="${size*0.82}" cy="${size*0.72}" rx="${size*0.06}" ry="${size*0.09}" fill="#D2691E" opacity="0.7"/>
                <line x1="${size*0.82}" y1="${size*0.63}" x2="${size*0.82}" y2="${size*0.50}" stroke="#8B4513" stroke-width="${size*0.015}" opacity="0.7"/>

                <!-- Arms -->
                <ellipse cx="${size*0.17}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.83}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#5D4037"/>
            </svg>
        `;
    }

    static createMioKPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="miok-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0d0d1a;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="miok-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Long black hair (Mio's signature long straight hair) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.30}" ry="${size*0.16}" fill="url(#miok-hair-${size})"/>
                <rect x="${size*0.20}" y="${size*0.16}" width="${size*0.15}" height="${size*0.58}" rx="${size*0.05}" fill="url(#miok-hair-${size})"/>
                <rect x="${size*0.65}" y="${size*0.16}" width="${size*0.15}" height="${size*0.58}" rx="${size*0.05}" fill="url(#miok-hair-${size})"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#miok-face-${size})"/>

                <!-- Eyes (gentle, slightly shy) -->
                <ellipse cx="${size*0.38}" cy="${size*0.34}" rx="${size*0.05}" ry="${size*0.08}" fill="#455A64"/>
                <ellipse cx="${size*0.62}" cy="${size*0.34}" rx="${size*0.05}" ry="${size*0.08}" fill="#455A64"/>
                <circle cx="${size*0.38}" cy="${size*0.33}" r="${size*0.025}" fill="#000"/>
                <circle cx="${size*0.62}" cy="${size*0.33}" r="${size*0.025}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.63}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>

                <!-- Shy gentle smile -->
                <path d="M ${size*0.44} ${size*0.46} Q ${size*0.5} ${size*0.50} ${size*0.56} ${size*0.46}" stroke="#D84315" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Heavy blush (she's easily embarrassed!) -->
                <circle cx="${size*0.26}" cy="${size*0.40}" r="${size*0.05}" fill="#FFB6E1" opacity="0.7"/>
                <circle cx="${size*0.74}" cy="${size*0.40}" r="${size*0.05}" fill="#FFB6E1" opacity="0.7"/>

                <!-- Body (school blazer) -->
                <path d="M ${size*0.32} ${size*0.56} Q ${size*0.5} ${size*0.52} ${size*0.68} ${size*0.56} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#1565C0"/>

                <!-- Collar ribbon -->
                <path d="M ${size*0.42} ${size*0.56} L ${size*0.5} ${size*0.62} L ${size*0.58} ${size*0.56}" stroke="#FF1744" stroke-width="${size*0.018}" fill="none" stroke-linecap="round"/>

                <!-- Bass guitar on the side — Elizabeth! -->
                <ellipse cx="${size*0.14}" cy="${size*0.75}" rx="${size*0.05}" ry="${size*0.08}" fill="#B71C1C" opacity="0.7"/>
                <line x1="${size*0.14}" y1="${size*0.67}" x2="${size*0.14}" y2="${size*0.52}" stroke="#880E4F" stroke-width="${size*0.015}" opacity="0.7"/>
                <rect x="${size*0.12}" y="${size*0.50}" width="${size*0.04}" height="${size*0.06}" rx="${size*0.01}" fill="#880E4F" opacity="0.6"/>

                <!-- Arms -->
                <ellipse cx="${size*0.18}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.13}" fill="#FFFACD"/>
                <ellipse cx="${size*0.82}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.13}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1a1a2e"/>
            </svg>
        `;
    }

    // ===== Lucky Star =====

    static createKonataPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="konata-hair-${size}" cx="40%" cy="30%">
                        <stop offset="0%" style="stop-color:#42A5F5;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1565C0;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="konata-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Long blue hair (super long, flowing) -->
                <ellipse cx="${size*0.5}" cy="${size*0.16}" rx="${size*0.30}" ry="${size*0.16}" fill="url(#konata-hair-${size})"/>
                <rect x="${size*0.20}" y="${size*0.16}" width="${size*0.15}" height="${size*0.60}" rx="${size*0.05}" fill="url(#konata-hair-${size})"/>
                <rect x="${size*0.65}" y="${size*0.16}" width="${size*0.15}" height="${size*0.60}" rx="${size*0.05}" fill="url(#konata-hair-${size})"/>

                <!-- Ahoge (Konata's signature antenna hair!) -->
                <path d="M ${size*0.48} ${size*0.06} Q ${size*0.42} ${size*0.00} ${size*0.55} ${size*0.02} Q ${size*0.52} ${size*0.08} ${size*0.48} ${size*0.12}" fill="url(#konata-hair-${size})" stroke="url(#konata-hair-${size})" stroke-width="${size*0.01}"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.22}" fill="url(#konata-face-${size})"/>

                <!-- Eyes (cat-like, mischievous, triangular) -->
                <path d="M ${size*0.30} ${size*0.35} L ${size*0.38} ${size*0.30} L ${size*0.44} ${size*0.37}" fill="#1565C0"/>
                <path d="M ${size*0.56} ${size*0.35} L ${size*0.62} ${size*0.30} L ${size*0.70} ${size*0.37}" fill="#1565C0"/>
                <circle cx="${size*0.37}" cy="${size*0.35}" r="${size*0.02}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.35}" r="${size*0.02}" fill="#000"/>
                <circle cx="${size*0.38}" cy="${size*0.34}" r="${size*0.008}" fill="#FFF"/>
                <circle cx="${size*0.64}" cy="${size*0.34}" r="${size*0.008}" fill="#FFF"/>

                <!-- Cat mouth (Konata's ":3" face!) -->
                <path d="M ${size*0.44} ${size*0.46} Q ${size*0.47} ${size*0.44} ${size*0.5} ${size*0.46} Q ${size*0.53} ${size*0.44} ${size*0.56} ${size*0.46}" stroke="#D84315" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.26}" cy="${size*0.41}" r="${size*0.04}" fill="#FFB6E1" opacity="0.5"/>
                <circle cx="${size*0.74}" cy="${size*0.41}" r="${size*0.04}" fill="#FFB6E1" opacity="0.5"/>

                <!-- Body (school uniform — sailor) -->
                <path d="M ${size*0.32} ${size*0.56} Q ${size*0.5} ${size*0.52} ${size*0.68} ${size*0.56} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#E8EAF6"/>

                <!-- Sailor collar -->
                <path d="M ${size*0.34} ${size*0.56} L ${size*0.5} ${size*0.66} L ${size*0.66} ${size*0.56}" stroke="#42A5F5" stroke-width="${size*0.025}" fill="none" stroke-linecap="round"/>
                <line x1="${size*0.5}" y1="${size*0.60}" x2="${size*0.5}" y2="${size*0.70}" stroke="#FF1744" stroke-width="${size*0.012}"/>

                <!-- Arms -->
                <ellipse cx="${size*0.17}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.83}" cy="${size*0.68}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1565C0"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#1565C0"/>
            </svg>
        `;
    }

    static createKagamiPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="kagami-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#9C27B0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#6A1B9A;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="kagami-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFEB99;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Long twintails (purple — Kagami's signature!) -->
                <ellipse cx="${size*0.15}" cy="${size*0.25}" rx="${size*0.10}" ry="${size*0.30}" fill="url(#kagami-hair-${size})"/>
                <ellipse cx="${size*0.85}" cy="${size*0.25}" rx="${size*0.10}" ry="${size*0.30}" fill="url(#kagami-hair-${size})"/>

                <!-- Main hair -->
                <ellipse cx="${size*0.5}" cy="${size*0.17}" rx="${size*0.28}" ry="${size*0.15}" fill="url(#kagami-hair-${size})"/>

                <!-- Hair ribbons (white/black bows at twintail bases) -->
                <circle cx="${size*0.26}" cy="${size*0.14}" r="${size*0.03}" fill="#FFF"/>
                <circle cx="${size*0.74}" cy="${size*0.14}" r="${size*0.03}" fill="#FFF"/>

                <!-- Head -->
                <circle cx="${size*0.5}" cy="${size*0.38}" r="${size*0.22}" fill="url(#kagami-face-${size})"/>

                <!-- Eyes (sharp, tsundere-ish) -->
                <ellipse cx="${size*0.37}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.08}" fill="#7B1FA2"/>
                <ellipse cx="${size*0.63}" cy="${size*0.35}" rx="${size*0.055}" ry="${size*0.08}" fill="#7B1FA2"/>
                <circle cx="${size*0.37}" cy="${size*0.34}" r="${size*0.028}" fill="#000"/>
                <circle cx="${size*0.63}" cy="${size*0.34}" r="${size*0.028}" fill="#000"/>
                <circle cx="${size*0.39}" cy="${size*0.32}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.65}" cy="${size*0.32}" r="${size*0.012}" fill="#FFF"/>

                <!-- Slightly annoyed / tsundere expression -->
                <path d="M ${size*0.43} ${size*0.48} Q ${size*0.5} ${size*0.46} ${size*0.57} ${size*0.48}" stroke="#8D6E63" stroke-width="${size*0.015}" fill="none" stroke-linecap="round"/>

                <!-- Blush -->
                <circle cx="${size*0.25}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>
                <circle cx="${size*0.75}" cy="${size*0.42}" r="${size*0.04}" fill="#FFB6E1" opacity="0.6"/>

                <!-- Body (school uniform — sailor) -->
                <path d="M ${size*0.32} ${size*0.58} Q ${size*0.5} ${size*0.54} ${size*0.68} ${size*0.58} L ${size*0.72} ${size*0.90} Q ${size*0.5} ${size*0.94} ${size*0.28} ${size*0.90} Z" fill="#E8EAF6"/>

                <!-- Sailor collar -->
                <path d="M ${size*0.34} ${size*0.58} L ${size*0.5} ${size*0.66} L ${size*0.66} ${size*0.58}" stroke="#9C27B0" stroke-width="${size*0.02}" fill="none" stroke-linecap="round"/>
                <line x1="${size*0.5}" y1="${size*0.62}" x2="${size*0.5}" y2="${size*0.70}" stroke="#FF1744" stroke-width="${size*0.012}"/>

                <!-- Arms -->
                <ellipse cx="${size*0.17}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>
                <ellipse cx="${size*0.83}" cy="${size*0.70}" rx="${size*0.07}" ry="${size*0.12}" fill="#FFFACD"/>

                <!-- Feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#6A1B9A"/>
                <ellipse cx="${size*0.62}" cy="${size*0.95}" rx="${size*0.07}" ry="${size*0.05}" fill="#6A1B9A"/>
            </svg>
        `;
    }

    // ===== Serial Experiments Lain =====

    static createLainPlushie(size) {
        return `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="lain-hair-${size}" cx="50%" cy="30%">
                        <stop offset="0%" style="stop-color:#8D6E63;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#5D4037;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lain-face-${size}" cx="50%" cy="40%">
                        <stop offset="0%" style="stop-color:#FFF8E1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFECB3;stop-opacity:1" />
                    </radialGradient>
                    <radialGradient id="lain-bear-${size}" cx="50%" cy="50%">
                        <stop offset="0%" style="stop-color:#E8E0D4;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C8B89A;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Bear suit hood (the iconic bear pajamas!) -->
                <circle cx="${size*0.5}" cy="${size*0.32}" r="${size*0.30}" fill="url(#lain-bear-${size})"/>

                <!-- Bear ears -->
                <circle cx="${size*0.25}" cy="${size*0.10}" r="${size*0.10}" fill="url(#lain-bear-${size})"/>
                <circle cx="${size*0.75}" cy="${size*0.10}" r="${size*0.10}" fill="url(#lain-bear-${size})"/>
                <!-- Inner ears -->
                <circle cx="${size*0.25}" cy="${size*0.10}" r="${size*0.05}" fill="#D7CCC8"/>
                <circle cx="${size*0.75}" cy="${size*0.10}" r="${size*0.05}" fill="#D7CCC8"/>

                <!-- Hair (messy bangs peeking out of hood) -->
                <ellipse cx="${size*0.5}" cy="${size*0.22}" rx="${size*0.20}" ry="${size*0.08}" fill="url(#lain-hair-${size})"/>
                <!-- Side hair strands -->
                <rect x="${size*0.26}" y="${size*0.22}" width="${size*0.08}" height="${size*0.18}" rx="${size*0.03}" fill="url(#lain-hair-${size})"/>
                <rect x="${size*0.66}" y="${size*0.22}" width="${size*0.08}" height="${size*0.18}" rx="${size*0.03}" fill="url(#lain-hair-${size})"/>

                <!-- Face (inside hood opening) -->
                <circle cx="${size*0.5}" cy="${size*0.36}" r="${size*0.18}" fill="url(#lain-face-${size})"/>

                <!-- Eyes (large, distant, melancholic — Lain's iconic stare) -->
                <ellipse cx="${size*0.40}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.07}" fill="#795548"/>
                <ellipse cx="${size*0.60}" cy="${size*0.34}" rx="${size*0.055}" ry="${size*0.07}" fill="#795548"/>
                <circle cx="${size*0.40}" cy="${size*0.33}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.60}" cy="${size*0.33}" r="${size*0.03}" fill="#000"/>
                <circle cx="${size*0.41}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>
                <circle cx="${size*0.61}" cy="${size*0.31}" r="${size*0.012}" fill="#FFF"/>

                <!-- Neutral/slight smile (enigmatic) -->
                <path d="M ${size*0.45} ${size*0.44} L ${size*0.55} ${size*0.44}" stroke="#8D6E63" stroke-width="${size*0.012}" fill="none" stroke-linecap="round"/>

                <!-- Bear suit body -->
                <path d="M ${size*0.26} ${size*0.55} Q ${size*0.5} ${size*0.50} ${size*0.74} ${size*0.55} L ${size*0.76} ${size*0.92} Q ${size*0.5} ${size*0.98} ${size*0.24} ${size*0.92} Z" fill="url(#lain-bear-${size})"/>

                <!-- Bear suit belly circle -->
                <ellipse cx="${size*0.5}" cy="${size*0.72}" rx="${size*0.12}" ry="${size*0.10}" fill="#D7CCC8" opacity="0.6"/>

                <!-- Bear paw details on hands -->
                <circle cx="${size*0.20}" cy="${size*0.76}" r="${size*0.07}" fill="url(#lain-bear-${size})"/>
                <circle cx="${size*0.80}" cy="${size*0.76}" r="${size*0.07}" fill="url(#lain-bear-${size})"/>
                <!-- Paw pads -->
                <circle cx="${size*0.20}" cy="${size*0.77}" r="${size*0.03}" fill="#D7CCC8"/>
                <circle cx="${size*0.80}" cy="${size*0.77}" r="${size*0.03}" fill="#D7CCC8"/>

                <!-- Wire / digital accent (subtle circuit line — "present day, present time") -->
                <line x1="${size*0.10}" y1="${size*0.90}" x2="${size*0.30}" y2="${size*0.85}" stroke="#4CAF50" stroke-width="${size*0.008}" opacity="0.4" stroke-dasharray="${size*0.02} ${size*0.015}"/>
                <line x1="${size*0.70}" y1="${size*0.85}" x2="${size*0.90}" y2="${size*0.90}" stroke="#4CAF50" stroke-width="${size*0.008}" opacity="0.4" stroke-dasharray="${size*0.02} ${size*0.015}"/>

                <!-- Bear suit feet -->
                <ellipse cx="${size*0.38}" cy="${size*0.96}" rx="${size*0.08}" ry="${size*0.05}" fill="url(#lain-bear-${size})"/>
                <ellipse cx="${size*0.62}" cy="${size*0.96}" rx="${size*0.08}" ry="${size*0.05}" fill="url(#lain-bear-${size})"/>
            </svg>
        `;
    }
}

