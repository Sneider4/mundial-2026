import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../services/football';

const STAGES = [
    { key: 'LAST_16',           label: 'Octavos' },
    { key: 'QUARTER_FINALS',    label: 'Cuartos' },
    { key: 'SEMI_FINALS',       label: 'Semis'   },
    { key: 'THIRD_PLACE',       label: '3er lugar'},
    { key: 'FINAL',             label: 'Final'   },
];

@Component({
    selector: 'app-bracket',
    imports: [CommonModule],
    templateUrl: './bracket.html',
})
export class Bracket implements OnInit {
    private fb = inject(FootballService);

    todos   = signal<any[]>([]);
    loading = signal(true);
    stages  = STAGES;

    porFase = computed(() => {
        return STAGES.map(s => ({
            ...s,
            partidos: this.todos().filter(m => m.stage === s.key),
        })).filter(s => s.partidos.length > 0);
    });

    ngOnInit() {
        this.fb.getPartidos().subscribe({
            next: r => { this.todos.set(r.matches ?? []); this.loading.set(false); },
            error: () => this.loading.set(false),
        });
    }

    flagUrl(team: any)  { return team?.crest ?? ''; }
    scoreL(m: any)      { return m.score?.fullTime?.home ?? '-'; }
    scoreV(m: any)      { return m.score?.fullTime?.away ?? '-'; }
    ganador(m: any)     {
        if (m.status !== 'FINISHED') return null;
        const h = m.score?.fullTime?.home, a = m.score?.fullTime?.away;
        if (h == null) return null;
        if (h > a) return m.homeTeam?.id;
        if (a > h) return m.awayTeam?.id;
        return null;
    }
}
