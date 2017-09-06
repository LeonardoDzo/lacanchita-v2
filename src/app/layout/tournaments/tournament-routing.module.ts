import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentsComponent } from './tournaments.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: TournamentsComponent},
  {path: ':id', component: TournamentDetailsComponent}
];
export const TournamentRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
