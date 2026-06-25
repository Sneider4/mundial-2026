import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FootballService } from '../services/football';

@Component({
    selector: 'app-grupos',
    imports: [CommonModule, RouterLink],
    templateUrl: './grupos.html',
})
export class Grupos implements OnInit {
    private fb = inject(FootballService);
    grupos  = signal<any[]>([]);
    loading = signal(true);

    ngOnInit() {
        this.fb.getStandings().subscribe({
            next: r => { this.grupos.set(r.standings ?? []); this.loading.set(false); },
            error: () => this.loading.set(false),
        });
    }

    flagUrl(team: any) { return team?.crest ?? ''; }
}
