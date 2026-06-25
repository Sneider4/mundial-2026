import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Grupos } from './pages/grupos';
import { Fixture } from './pages/fixture';
import { Bracket } from './pages/bracket';
import { Equipo } from './pages/equipo';

export const routes: Routes = [
    { path: '',         component: Home    },
    { path: 'grupos',   component: Grupos  },
    { path: 'fixture',  component: Fixture },
    { path: 'bracket',  component: Bracket },
    { path: 'equipo/:id', component: Equipo },
    { path: '**',       redirectTo: ''     },
];
