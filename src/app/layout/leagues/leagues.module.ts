import { LeaguesRoutingModule } from './leagues-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesComponent } from './leagues.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { SharedModuleModule } from '../../shared/modules/shared-module/shared-module.module';
import { TeamFormComponent } from '../../shared/modules/shared-module/team/team-form/team-form.component';
import { TeamItemComponent } from '../../shared/modules/shared-module/team/team-item/team-item.component';
import { FutbolDayModule } from '../../shared/modules/futbol-day/futbol-day.module';

import {
  MdTabsModule,
  MdCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LeaguesRoutingModule, 
    FormsModule,
    PageHeaderModule,
    SharedModuleModule,
    FutbolDayModule,
    MdCardModule,
    NgbAccordionModule,
    MdTabsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    LeaguesComponent,
    LeagueDetailComponent]
})
export class LeaguesModule { }