import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [
  {path: '', component: TeamsComponent},
  {path: ':id', component: TeamDetailComponent}
];

export const TeamRoutingModule : ModuleWithProviders = RouterModule.forChild(routes);
