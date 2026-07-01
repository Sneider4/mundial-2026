import { Component, OnInit, inject, signal, computed, viewChild, ElementRef, effect } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FootballService } from '../services/football';
import { Chart } from 'chart.js';
import { darkTooltip, darkScalesX, darkScalesY } from '../utils/chart-setup';

const GROUP_COLORS = [
    'rgba(201,168,76,.7)', 'rgba(96,165,250,.7)', 'rgba(74,222,128,.7)',
    'rgba(248,113,113,.7)', 'rgba(167,139,250,.7)', 'rgba(52,211,153,.7)',
    'rgba(251,191,36,.7)', 'rgba(244,114,182,.7)', 'rgba(34,211,238,.7)',
    'rgba(249,115,22,.7)', 'rgba(163,230,53,.7)', 'rgba(232,121,249,.7)',
];

@Component({
    selector: 'app-estadisticas',
    imports: [CommonModule, DecimalPipe],
    templateUrl: './estadisticas.html',
})
export class Estadisticas implements OnInit {
    private fb = inject(FootballService);

    grupos   = signal<any[]>([]);
    scorers  = signal<any[]>([]);
    partidos = signal<any[]>([]);
    loading  = signal(true);
    private loaded = 0;

    // ── Computed ─────────────────────────────────────────────────
    todasSelecciones = computed(() =>
        this.grupos().flatMap(g => g.table ?? [])
    );

    totalGoles = computed(() =>
        this.partidos()
            .filter(m => m.status === 'FINISHED')
            .reduce((s, m) => s + (m.score?.fullTime?.home ?? 0) + (m.score?.fullTime?.away ?? 0), 0)
    );

    totalJugados = computed(() =>
        this.partidos().filter(m => m.status === 'FINISHED').length
    );

    promedioGoles = computed(() => {
        const j = this.totalJugados();
        return j > 0 ? (this.totalGoles() / j).toFixed(2) : '–';
    });

    mejoresAtaques = computed(() =>
        [...this.todasSelecciones()]
            .sort((a, b) => b.goalsFor - a.goalsFor)
            .slice(0, 10)
    );

    mejoresDefensas = computed(() =>
        [...this.todasSelecciones()]
            .filter(t => t.playedGames > 0)
            .sort((a, b) => a.goalsAgainst - b.goalsAgainst)
            .slice(0, 10)
    );

    golesGrupo = computed(() =>
        this.grupos()
            .map(g => ({
                grupo: (g.group ?? '').replace('GROUP_', ''),
                goles: (g.table ?? []).reduce((s: number, t: any) => s + (t.goalsFor ?? 0), 0),
            }))
            .filter(g => g.goles > 0)
            .sort((a, b) => a.grupo.localeCompare(b.grupo))
    );

    resultados = computed(() => {
        const f = this.partidos().filter(m => m.status === 'FINISHED');
        return {
            local:    f.filter(m => (m.score?.fullTime?.home ?? 0) > (m.score?.fullTime?.away ?? 0)).length,
            empate:   f.filter(m => (m.score?.fullTime?.home ?? 0) === (m.score?.fullTime?.away ?? 0)).length,
            visitante:f.filter(m => (m.score?.fullTime?.home ?? 0) < (m.score?.fullTime?.away ?? 0)).length,
        };
    });

    // ── Chart refs ───────────────────────────────────────────────
    private atacantesRef = viewChild<ElementRef<HTMLCanvasElement>>('atacantesChart');
    private defensasRef  = viewChild<ElementRef<HTMLCanvasElement>>('defensasChart');
    private resultRef    = viewChild<ElementRef<HTMLCanvasElement>>('resultChart');
    private gruposRef    = viewChild<ElementRef<HTMLCanvasElement>>('gruposChart');

    private charts: Record<string, Chart | null> = {
        ataq: null, def: null, result: null, grupos: null,
    };

    constructor() {
        effect(() => {
            const data   = this.mejoresAtaques();
            const canvas = this.atacantesRef()?.nativeElement;
            if (!data.length || !canvas) return;
            this.charts['ataq']?.destroy();
            this.charts['ataq'] = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: data.map(t => t.team?.shortName ?? t.team?.name),
                    datasets: [{
                        label: 'Goles anotados',
                        data: data.map(t => t.goalsFor),
                        backgroundColor: 'rgba(201,168,76,.7)',
                        borderColor: '#c9a84c',
                        borderWidth: 1, borderRadius: 4,
                    }],
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: darkTooltip },
                    scales: { x: darkScalesX, y: darkScalesY },
                },
            });
        });

        effect(() => {
            const data   = this.mejoresDefensas();
            const canvas = this.defensasRef()?.nativeElement;
            if (!data.length || !canvas) return;
            this.charts['def']?.destroy();
            this.charts['def'] = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: data.map(t => t.team?.shortName ?? t.team?.name),
                    datasets: [{
                        label: 'Goles recibidos',
                        data: data.map(t => t.goalsAgainst),
                        backgroundColor: 'rgba(96,165,250,.6)',
                        borderColor: '#60a5fa',
                        borderWidth: 1, borderRadius: 4,
                    }],
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: darkTooltip },
                    scales: { x: darkScalesX, y: darkScalesY },
                },
            });
        });

        effect(() => {
            const res    = this.resultados();
            const canvas = this.resultRef()?.nativeElement;
            const total  = res.local + res.empate + res.visitante;
            if (!total || !canvas) return;
            this.charts['result']?.destroy();
            this.charts['result'] = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: ['Victoria Local', 'Empate', 'Victoria Visitante'],
                    datasets: [{
                        data: [res.local, res.empate, res.visitante],
                        backgroundColor: ['rgba(74,222,128,.7)', 'rgba(201,168,76,.6)', 'rgba(96,165,250,.7)'],
                        borderColor: ['#4ade80', '#c9a84c', '#60a5fa'],
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#8892a4', font: { size: 11 }, padding: 16, boxWidth: 12 },
                        },
                        tooltip: {
                            ...darkTooltip,
                            callbacks: {
                                label: ctx => {
                                    const pct = ((ctx.raw as number) / total * 100).toFixed(1);
                                    return ` ${ctx.raw} partidos (${pct}%)`;
                                },
                            },
                        },
                    },
                    cutout: '62%',
                },
            });
        });

        effect(() => {
            const data   = this.golesGrupo();
            const canvas = this.gruposRef()?.nativeElement;
            if (!data.length || !canvas) return;
            this.charts['grupos']?.destroy();
            this.charts['grupos'] = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: data.map(g => `Grupo ${g.grupo}`),
                    datasets: [{
                        label: 'Goles',
                        data: data.map(g => g.goles),
                        backgroundColor: data.map((_, i) => GROUP_COLORS[i % GROUP_COLORS.length]),
                        borderRadius: 4,
                    }],
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: darkTooltip },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,.05)' },
                            ticks: { color: '#8892a4', font: { size: 11 } },
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,.05)' },
                            ticks: { color: '#4a5568', font: { size: 11 } },
                        },
                    },
                },
            });
        });
    }

    ngOnInit() {
        this.fb.getStandings().subscribe({
            next: r => { this.grupos.set(r.standings ?? []); this.done(); },
            error: () => this.done(),
        });
        this.fb.getPartidos().subscribe({
            next: r => { this.partidos.set(r.matches ?? []); this.done(); },
            error: () => this.done(),
        });
        this.fb.getGoleadores(20).subscribe({
            next: r => { this.scorers.set(r.scorers ?? []); this.done(); },
            error: () => this.done(),
        });
    }

    private done() { if (++this.loaded >= 3) this.loading.set(false); }

    flagUrl(team: any) { return team?.crest ?? ''; }
}
