import { Component, OnInit, inject, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
import { FootballService } from '../services/football';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

const POLL_PARTIDOS_MS = 30_000;

@Component({
    selector: 'app-fixture',
    imports: [CommonModule, DatePipe],
    templateUrl: './fixture.html',
})
export class Fixture implements OnInit {
    private fb = inject(FootballService);
    private destroyRef = inject(DestroyRef);

    todos   = signal<any[]>([]);
    filtro  = signal<string>('TODOS');
    loading = signal(true);
    ultimaActualizacion = signal<Date | null>(null);

    filtros = ['TODOS', 'SCHEDULED', 'LIVE', 'FINISHED'];

    partidos = computed(() => {
        const f = this.filtro();
        return f === 'TODOS' ? this.todos() : this.todos().filter(m => m.status === f);
    });

    porFecha = computed(() => {
        const mapa = new Map<string, any[]>();
        for (const m of this.partidos()) {
            const key = new Date(m.utcDate).toDateString();
            if (!mapa.has(key)) mapa.set(key, []);
            mapa.get(key)!.push(m);
        }
        return [...mapa.entries()].map(([fecha, partidos]) => ({ fecha, partidos }));
    });

    ngOnInit() {
        interval(POLL_PARTIDOS_MS).pipe(
            startWith(0),
            switchMap(() => this.fb.getPartidos()),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: r => {
                this.todos.set(r.matches ?? []);
                this.ultimaActualizacion.set(new Date());
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    }

    setFiltro(f: string) { this.filtro.set(f); }
    flagUrl(team: any)   { return team?.crest ?? ''; }
    scoreLocal(m: any)   { return m.score?.fullTime?.home ?? '-'; }
    scoreVisita(m: any)  { return m.score?.fullTime?.away ?? '-'; }

    labelFiltro(f: string) {
        return { TODOS:'Todos', SCHEDULED:'Programados', LIVE:'En vivo', FINISHED:'Finalizados' }[f] ?? f;
    }
    countFiltro(f: string) {
        return this.todos().filter(m => m.status === f).length;
    }
}
