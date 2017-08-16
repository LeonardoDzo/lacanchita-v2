import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchFormComponent } from './match-form/match-form.component';
import { MatchItemComponent } from './match-item/match-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchPickComponent } from './match-pick/match-pick.component';
import { StandingTeamComponent } from './standing-team/standing-team.component';
import { SortableModule,CarouselModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdOptionModule,MdSelectModule,MdInputModule, } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SortableModule.forRoot(),
    ReactiveFormsModule,
    MdOptionModule,
    MdSelectModule,
    MdInputModule
  ],
  declarations: [MatchFormComponent, MatchItemComponent, MatchPickComponent, StandingTeamComponent],
  exports: [MatchFormComponent, MatchItemComponent, MatchPickComponent, StandingTeamComponent]
})
export class MatchSharedModule { }
