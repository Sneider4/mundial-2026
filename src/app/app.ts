import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar';
import { Footer } from './shared/footer';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar, Footer],
    template: `
        <app-navbar />
        <main style="padding-top:60px; min-height:100vh">
            <router-outlet />
        </main>
        <app-footer />

        <!-- Badge flotante de autor -->
        <div class="author-badge">
            <span class="author-badge-name">Sneider Malagón</span>
            <div class="author-badge-links">
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
    `,
    styles: [`
        .author-badge {
            position: fixed; bottom: 20px; right: 20px; z-index: 90;
            display: flex; align-items: center; gap: 10px;
            padding: 8px 14px; border-radius: 30px;
            background: rgba(7,9,13,.88);
            border: 1px solid rgba(201,168,76,.25);
            backdrop-filter: blur(16px);
            box-shadow: 0 4px 24px rgba(0,0,0,.4);
            transition: border-color .2s;
        }
        .author-badge:hover { border-color: rgba(201,168,76,.55); }

        .author-badge-name {
            font-family: 'Space Grotesk', sans-serif;
            font-size: .72rem; font-weight: 600;
            color: #c9a84c; white-space: nowrap;
        }

        .author-badge-links {
            display: flex; align-items: center; gap: 10px;
            padding-left: 10px;
            border-left: 1px solid rgba(255,255,255,.08);
        }
        .author-badge-links a {
            font-size: .95rem; color: #4a5568;
            text-decoration: none; transition: color .18s; line-height: 1;
        }
        .author-badge-links a:hover { color: #c9a84c; }

        @media (max-width: 480px) {
            .author-badge { bottom: 12px; right: 12px; padding: 7px 12px; }
            .author-badge-name { display: none; }
        }
    `]
})
export class App {}
