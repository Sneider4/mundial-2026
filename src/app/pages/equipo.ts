import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FootballService } from '../services/football';

const ORDEN_POSICIONES = ['Goalkeeper', 'Defence', 'Midfield', 'Offence'];
const NOMBRE_POSICION: Record<string, string> = {
    Goalkeeper: 'Porteros',
    Defence: 'Defensas',
    Midfield: 'Mediocampistas',
    Offence: 'Delanteros',
    Otros: 'Otros',
};

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

    plantilla = computed(() => {
        const squad: any[] = this.equipo()?.squad ?? [];
        const grupos = new Map<string, any[]>();
        for (const jugador of squad) {
            const key = ORDEN_POSICIONES.includes(jugador.position) ? jugador.position : 'Otros';
            if (!grupos.has(key)) grupos.set(key, []);
            grupos.get(key)!.push(jugador);
        }
        return [...ORDEN_POSICIONES, 'Otros']
            .filter(key => grupos.has(key))
            .map(key => ({ key, label: NOMBRE_POSICION[key], jugadores: grupos.get(key)! }));
    });

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

    edad(fechaNacimiento?: string): number | null {
        if (!fechaNacimiento) return null;
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        return edad;
    }

    subLabel(jugador: any): string {
        const partes: string[] = [];
        const e = this.edad(jugador.dateOfBirth);
        if (e != null) partes.push(`${e} años`);
        if (jugador.nationality) partes.push(jugador.nationality);
        return partes.join(' · ');
    }
}
