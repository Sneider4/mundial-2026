import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
        <footer class="site-footer">
            <div class="footer-top-line"></div>
            <div class="container-xl footer-inner">

                <div class="footer-col">
                    <span class="footer-icon">⬡</span>
                    <div>
                        <p class="footer-title">Mundial 2026</p>
                        <p class="footer-sub">FIFA World Cup · USA · CAN · MEX</p>
                    </div>
                </div>

                <div class="footer-col footer-stack">
                    <p class="footer-section-label">Stack</p>
                    <div class="stack-tags">
                        <span class="stack-tag">Angular 21</span>
                        <span class="stack-tag">Chart.js</span>
                        <span class="stack-tag">Bootstrap 5</span>
                        <span class="stack-tag">football-data.org</span>
                        <span class="stack-tag">Vercel</span>
                    </div>
                </div>

                <div class="footer-col footer-author">
                    <p class="footer-section-label">Desarrollado por</p>
                    <p class="footer-name">Sneider Malagón</p>
                    <p class="footer-role">Fullstack Developer · Angular · Node.js</p>
                    <div class="footer-links">
                        <a href="https://sneider4.github.io/portfolio/" target="_blank" rel="noopener" title="Portafolio">
                            <i class="bi bi-globe2"></i>
                        </a>
                        <a href="https://github.com/Sneider4" target="_blank" rel="noopener" title="GitHub">
                            <i class="bi bi-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/sneider-malagon" target="_blank" rel="noopener" title="LinkedIn">
                            <i class="bi bi-linkedin"></i>
                        </a>
                    </div>
                </div>

            </div>
            <div class="footer-copy">
                Hecho por Sneider Malagón · 2026
            </div>
        </footer>
    `,
    styles: [`
        .site-footer {
            margin-top: 80px;
            background: rgba(255,255,255,.02);
            border-top: 1px solid rgba(255,255,255,.06);
        }
        .footer-top-line {
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a84c 40%, transparent);
            opacity: .35;
        }
        .footer-inner {
            display: flex; flex-wrap: wrap; gap: 40px;
            padding: 40px 24px 32px;
            justify-content: space-between; align-items: flex-start;
        }
        .footer-col { display: flex; flex-direction: column; gap: 6px; }
        .footer-col:first-child { flex-direction: row; align-items: center; gap: 12px; }

        .footer-icon {
            font-size: 2rem; color: #c9a84c;
            filter: drop-shadow(0 0 10px rgba(201,168,76,.4));
            line-height: 1;
        }
        .footer-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: .95rem; font-weight: 700; color: #e8edf4; margin: 0;
        }
        .footer-sub { font-size: .65rem; color: #4a5568; letter-spacing: .1em; text-transform: uppercase; margin: 0; }

        .footer-section-label {
            font-size: .6rem; font-weight: 600; letter-spacing: .16em;
            text-transform: uppercase; color: #4a5568; margin: 0 0 8px;
        }

        .stack-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .stack-tag {
            font-size: .68rem; padding: 3px 10px; border-radius: 20px;
            border: 1px solid rgba(255,255,255,.08);
            color: #8892a4; background: rgba(255,255,255,.03);
        }

        .footer-name {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1rem; font-weight: 700; color: #c9a84c; margin: 0;
        }
        .footer-role { font-size: .68rem; color: #4a5568; margin: 0; }

        .footer-links {
            display: flex; gap: 14px; margin-top: 8px;
        }
        .footer-links a {
            font-size: 1.15rem; color: #4a5568;
            text-decoration: none; transition: color .18s;
        }
        .footer-links a:hover { color: #c9a84c; }

        .footer-copy {
            text-align: center; padding: 16px 24px;
            font-size: .65rem; color: #4a5568; letter-spacing: .08em;
            border-top: 1px solid rgba(255,255,255,.04);
        }

        @media (max-width: 640px) {
            .footer-inner { gap: 28px; padding: 32px 20px 24px; }
        }
    `]
})
export class Footer {}
