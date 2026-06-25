import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    template: `
        <header class="site-header">
            <nav class="nav-inner container-xl">
                <a routerLink="/" class="brand">
                    <span class="brand-icon">⬡</span>
                    <div class="brand-text">
                        <span class="brand-name">Mundial 2026</span>
                        <span class="brand-sub">USA · CAN · MEX</span>
                    </div>
                </a>

                <ul class="nav-links">
                    <li><a routerLink="/"       routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a></li>
                    <li><a routerLink="/grupos"  routerLinkActive="active">Grupos</a></li>
                    <li><a routerLink="/fixture" routerLinkActive="active">Fixture</a></li>
                    <li><a routerLink="/bracket" routerLinkActive="active">Eliminatorias</a></li>
                </ul>
            </nav>
        </header>
    `,
    styles: [`
        .site-header {
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            height: 60px;
            background: rgba(7,9,13,.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .nav-inner {
            height: 100%; display: flex; align-items: center;
            justify-content: space-between; padding: 0 24px;
        }
        .brand {
            display: flex; align-items: center; gap: 10px;
            text-decoration: none; color: inherit;
        }
        .brand-icon {
            font-size: 1.4rem; color: #c9a84c; line-height: 1;
            filter: drop-shadow(0 0 8px rgba(201,168,76,.5));
        }
        .brand-name {
            display: block; font-family: 'Space Grotesk', sans-serif;
            font-weight: 700; font-size: .95rem; color: #e8edf4;
            letter-spacing: -.01em;
        }
        .brand-sub {
            display: block; font-size: .6rem; letter-spacing: .15em;
            color: #4a5568; text-transform: uppercase; margin-top: 1px;
        }
        .nav-links {
            list-style: none; display: flex; gap: 2px;
        }
        .nav-links a {
            display: block; padding: 6px 14px; border-radius: 6px;
            font-size: .82rem; font-weight: 500; color: #8892a4;
            text-decoration: none; letter-spacing: .01em;
            transition: color .15s, background .15s;
        }
        .nav-links a:hover { color: #e8edf4; background: rgba(255,255,255,.05); }
        .nav-links a.active { color: #c9a84c; background: rgba(201,168,76,.1); }
    `]
})
export class Navbar {}
