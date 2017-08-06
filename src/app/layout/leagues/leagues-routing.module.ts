import { NgModule, ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { FutbolDayDetailComponent } from '../../shared/modules/futbol-day/futbol-day-detail/futbol-day-detail.component';

const routes: Routes = [
    {path: '', component: LeaguesComponent},
    {path: ':id', component: LeagueDetailComponent},
    {path: 'footballDay/:id', component: FutbolDayDetailComponent}
];

export const LeaguesRoutingModule : ModuleWithProviders = RouterModule.forChild(routes);
