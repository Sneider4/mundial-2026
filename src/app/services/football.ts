import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BASE = `${environment.apiUrl}/competitions/${environment.competitionCode}`;

@Injectable({ providedIn: 'root' })
export class FootballService {
    private http = inject(HttpClient);

    getPartidos(params?: { matchday?: number; stage?: string; status?: string }) {
        const p = new URLSearchParams();
        if (params?.matchday) p.set('matchday', String(params.matchday));
        if (params?.stage)    p.set('stage', params.stage);
        if (params?.status)   p.set('status', params.status);
        const q = p.toString() ? '?' + p.toString() : '';
        return this.http.get<any>(`${BASE}/matches${q}`);
    }

    getStandings()   { return this.http.get<any>(`${BASE}/standings`); }
    getGoleadores(limit = 10)  { return this.http.get<any>(`${BASE}/scorers?limit=${limit}`); }
    getEquipos()     { return this.http.get<any>(`${BASE}/teams`); }

    getEquipo(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/teams/${id}`);
    }

    getPartidosEquipo(id: number) {
        return this.http.get<any>(
            `${environment.apiUrl}/teams/${id}/matches?competitions=${environment.competitionCode}`
        );
    }
}
