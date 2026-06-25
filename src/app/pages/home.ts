import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FootballService } from '../services/football';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink, DatePipe],
    templateUrl: './home.html',
})
export class Home implements OnInit {
    private fb = inject(FootballService);

    enVivo     = signal<any[]>([]);
    recientes  = signal<any[]>([]);
    proximos   = signal<any[]>([]);
    goleadores = signal<any[]>([]);
    loading    = signal(true);

    ngOnInit() {
        this.fb.getPartidos({ status: 'LIVE' }).subscribe({
            next: r => this.enVivo.set(r.matches ?? [])
        });

        this.fb.getPartidos({ status: 'FINISHED' }).subscribe({
            next: r => this.recientes.set((r.matches ?? []).slice(-6).reverse())
        });

        this.fb.getPartidos({ status: 'SCHEDULED' }).subscribe({
            next: r => { this.proximos.set((r.matches ?? []).slice(0, 6)); this.loading.set(false); }
        });

        this.fb.getGoleadores().subscribe({
            next: r => this.goleadores.set(r.scorers ?? [])
        });
    }

    scoreLocal(m: any)    { return m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? '-'; }
    scoreVisitante(m: any){ return m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? '-'; }
    flagUrl(team: any)    { return team?.crest ?? ''; }
}
