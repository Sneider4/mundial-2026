import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../services/football';

const STAGE_ORDER = ['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'];

const LABELS: Record<string, string> = {
    LAST_32:        'Treintaidosavos',
    LAST_16:        'Octavos',
    QUARTER_FINALS: 'Cuartos',
    SEMI_FINALS:    'Semifinales',
    FINAL:          'Final',
    THIRD_PLACE:    'Tercer lugar',
};

// Slot height for the round with the most matches (px per match card + spacing)
const BASE_SLOT = 90;
// SVG connector width between columns
const CONN_W    = 36;

@Component({
    selector: 'app-bracket',
    imports: [CommonModule],
    templateUrl: './bracket.html',
    styleUrl: './bracket.scss',
})
export class Bracket implements OnInit {
    private fb = inject(FootballService);

    todos   = signal<any[]>([]);
    loading = signal(true);
    error   = signal(false);

    readonly connW = CONN_W;

    ngOnInit() {
        this.fb.getPartidos().subscribe({
            next:  r => { this.todos.set(r.matches ?? []); this.loading.set(false); },
            error: () => { this.error.set(true);            this.loading.set(false); },
        });
    }

    readonly rounds = computed(() => {
        const all = this.todos();
        const rounds = STAGE_ORDER
            .map(key => ({
                key,
                label:   LABELS[key] ?? key,
                matches: all.filter(m => m.stage === key),
            }))
            .filter(r => r.matches.length > 0);

        if (!rounds.length) return [];

        const maxM   = rounds[0].matches.length;
        const totalH = maxM * BASE_SLOT;

        return rounds.map(r => ({
            ...r,
            totalH,
            slotH: totalH / r.matches.length,
        }));
    });

    readonly tercerLugar = computed(() =>
        this.todos().find(m => m.stage === 'THIRD_PLACE') ?? null
    );

    /**
     * Generates the SVG path for bracket connectors between two rounds.
     * For each pair of matches (left round) → one match (right round):
     *   - horizontal hook at each match center
     *   - vertical bar connecting the two hooks
     *   - outgoing horizontal line at the midpoint to the next round
     */
    connPath(leftMatches: number, totalH: number): string {
        const slotH    = totalH / leftMatches;
        const numPairs = Math.floor(leftMatches / 2);
        const half     = CONN_W / 2;
        let d = '';

        for (let i = 0; i < numPairs; i++) {
            const y1 = slotH * (4 * i + 1) / 2;   // center of top match in pair
            const y2 = slotH * (4 * i + 3) / 2;   // center of bottom match in pair
            const ym = (y1 + y2) / 2;              // midpoint → next round center

            // top hook + vertical bar + bottom hook + outgoing line
            d += ` M0,${y1} H${half} V${y2} H0 M${half},${ym} H${CONN_W}`;
        }
        return d.trim();
    }

    flagUrl(team: any) { return team?.crest ?? ''; }
    scoreL(m: any)     { return m.score?.fullTime?.home ?? '-'; }
    scoreV(m: any)     { return m.score?.fullTime?.away ?? '-'; }

    ganador(m: any): number | null {
        if (m.status !== 'FINISHED') return null;
        const h = m.score?.fullTime?.home;
        const a = m.score?.fullTime?.away;
        if (h == null) return null;
        if (h > a) return m.homeTeam?.id;
        if (a > h) return m.awayTeam?.id;
        return null; // draw (shouldn't happen in KO)
    }
}
