import { MatchesComponent } from './matches.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MatchesComponent},
  { path: ':id', component: MatchDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
