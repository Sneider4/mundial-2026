import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FootballService } from '../services/football';

@Component({
    selector: 'app-equipo',
    imports: [CommonModule, RouterLink, DatePipe],
    templateUrl: './equipo.html',
})
export class Equipo implements OnInit {
    private route = inject(ActivatedRoute);
    private fb    = inject(FootballService);

    equipo   = signal<any>(null);
    partidos = signal<any[]>([]);
    loading  = signal(true);

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.fb.getEquipo(id).subscribe({
            next: r => { this.equipo.set(r); this.loading.set(false); }
        });
        this.fb.getPartidosEquipo(id).subscribe({
            next: r => this.partidos.set(r.matches ?? [])
        });
    }

    flagUrl(team: any)  { return team?.crest ?? this.equipo()?.crest ?? ''; }
    scoreL(m: any)      { return m.score?.fullTime?.home ?? '-'; }
    scoreV(m: any)      { return m.score?.fullTime?.away ?? '-'; }
    resultado(m: any)   {
        if (m.status !== 'FINISHED') return null;
        const id = this.equipo()?.id;
        const h = m.score?.fullTime?.home, a = m.score?.fullTime?.away;
        if (h == null) return null;
        const esLocal = m.homeTeam?.id === id;
        const misGoles = esLocal ? h : a, rivGoles = esLocal ? a : h;
        if (misGoles > rivGoles) return 'W';
        if (misGoles < rivGoles) return 'L';
        return 'D';
    }
    colorRes(r: string | null) {
        return { W: '#22c55e', L: '#e63946', D: '#f4b942' }[r ?? ''] ?? '#7a8399';
    }
}
