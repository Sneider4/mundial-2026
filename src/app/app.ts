import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Navbar],
    template: `
        <app-navbar />
        <main style="padding-top:60px; min-height:100vh">
            <router-outlet />
        </main>
    `
})
export class App {}
