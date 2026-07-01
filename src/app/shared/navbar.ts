import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    template: `
        <header class="site-header">
            <nav class="nav-inner container-xl">
                <a routerLink="/" class="brand" (click)="close()">
                    <span class="brand-icon">⬡</span>
                    <div class="brand-text">
                        <span class="brand-name">Mundial 2026</span>
                        <span class="brand-sub">USA · CAN · MEX</span>
                    </div>
                </a>

                <button class="hamburger" (click)="toggle()" [class.open]="open()" aria-label="Menú">
                    <span></span><span></span><span></span>
                </button>

                <ul class="nav-links" [class.open]="open()">
                    <li><a routerLink="/"              routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="close()">Inicio</a></li>
                    <li><a routerLink="/grupos"         routerLinkActive="active" (click)="close()">Grupos</a></li>
                    <li><a routerLink="/fixture"        routerLinkActive="active" (click)="close()">Fixture</a></li>
                    <li><a routerLink="/bracket"        routerLinkActive="active" (click)="close()">Eliminatorias</a></li>
                    <li><a routerLink="/estadisticas"   routerLinkActive="active" (click)="close()">Estadísticas</a></li>
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
            position: relative;
        }
        .brand {
            display: flex; align-items: center; gap: 10px;
            text-decoration: none; color: inherit; z-index: 1;
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

        .hamburger {
            display: none; flex-direction: column; justify-content: space-between;
            width: 28px; height: 20px; background: none; border: none;
            cursor: pointer; padding: 0; z-index: 1;
        }
        .hamburger span {
            display: block; height: 2px; background: #8892a4;
            border-radius: 2px; transition: all .22s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

        @media (max-width: 640px) {
            .hamburger { display: flex; }
            .nav-links {
                display: none; flex-direction: column; gap: 0;
                position: absolute; top: 60px; left: 0; right: 0;
                background: rgba(7,9,13,.97);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255,255,255,.06);
                padding: 8px 16px 16px;
            }
            .nav-links.open { display: flex; }
            .nav-links a { padding: 13px 16px; border-radius: 8px; font-size: .9rem; }
        }
    `]
})
export class Navbar {
    open = signal(false);
    toggle() { this.open.update(v => !v); }
    close()  { this.open.set(false); }
}
