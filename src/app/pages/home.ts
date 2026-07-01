import { Component, OnInit, inject, signal, computed, viewChild, ElementRef, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FootballService } from '../services/football';
import { Chart } from 'chart.js';
import { darkTooltip, darkScalesX, darkScalesY } from '../utils/chart-setup';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink, DatePipe],
    templateUrl: './home.html',
})
export class Home implements OnInit {
    private fb = inject(FootballService);

    todosPartidos = signal<any[]>([]);
    enVivo        = signal<any[]>([]);
    recientes     = signal<any[]>([]);
    proximos      = signal<any[]>([]);
    goleadores    = signal<any[]>([]);
    loading       = signal(true);
    error         = signal(false);

    totalGoles = computed(() =>
        this.todosPartidos()
            .filter(m => m.status === 'FINISHED')
            .reduce((s, m) => s + (m.score?.fullTime?.home ?? 0) + (m.score?.fullTime?.away ?? 0), 0)
    );
    partidosJugados = computed(() =>
        this.todosPartidos().filter(m => m.status === 'FINISHED').length
    );
    promedioGoles = computed(() => {
        const j = this.partidosJugados();
        return j > 0 ? (this.totalGoles() / j).toFixed(1) : '–';
    });
    lidGoleador = computed(() => this.goleadores()[0] ?? null);

    private scorersRef  = viewChild<ElementRef<HTMLCanvasElement>>('scorersChart');
    private scorersChart: Chart | null = null;

    constructor() {
        effect(() => {
            const scorers = this.goleadores();
            const canvas  = this.scorersRef()?.nativeElement;
            if (!scorers.length || !canvas) return;

            this.scorersChart?.destroy();
            const top = scorers.slice(0, 8);

            this.scorersChart = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: top.map(s => s.player?.name ?? ''),
                    datasets: [{
                        label: 'Goles',
                        data: top.map(s => s.goals ?? 0),
                        backgroundColor: top.map((_, i) =>
                            i === 0 ? 'rgba(201,168,76,.85)' : 'rgba(255,255,255,.07)'
                        ),
                        borderColor: top.map((_, i) =>
                            i === 0 ? '#c9a84c' : 'rgba(255,255,255,.12)'
                        ),
                        borderWidth: 1,
                        borderRadius: 4,
                    }],
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            ...darkTooltip,
                            callbacks: {
                                label: ctx => ` ${ctx.raw} goles`,
                                afterLabel: ctx => ` ${scorers[ctx.dataIndex]?.team?.shortName ?? ''}`,
                            },
                        },
                    },
                    scales: {
                        x: { ...darkScalesX },
                        y: { ...darkScalesY },
                    },
                },
            });
        });
    }

    ngOnInit() {
        this.fb.getPartidos().subscribe({
            next: r => {
                const all: any[] = r.matches ?? [];
                this.todosPartidos.set(all);
                this.enVivo.set(all.filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY'));
                this.recientes.set(all.filter(m => m.status === 'FINISHED').slice(-6).reverse());
                this.proximos.set(
                    all.filter(m => m.status === 'TIMED' || m.status === 'SCHEDULED').slice(0, 6)
                );
                this.loading.set(false);
            },
            error: () => { this.error.set(true); this.loading.set(false); }
        });

        this.fb.getGoleadores(8).subscribe({
            next: r => this.goleadores.set(r.scorers ?? [])
        });
    }

    scoreLocal(m: any)    { return m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? '-'; }
    scoreVisitante(m: any){ return m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? '-'; }
    flagUrl(team: any)    { return team?.crest ?? ''; }
}
