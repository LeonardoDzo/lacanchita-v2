import { StadiumService } from './stadium/stadium.service';

import { UploadService } from '../shared/modules/upload-module/upload/shared/upload.service';
import { TeamService } from './teams/shared/team.service';
import { LeagueService } from './leagues/shared/league.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { TournamentService } from './tournaments/shared/tournament.service';
import { MdCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatchService } from './matches/shared/match.service';
import { FutbolDayService } from '../shared/modules/futbol-day/shared/futbol-day.service';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        MdCardModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent
        
    ],
    providers:  [
        LeagueService,
        TournamentService,
        TeamService,
        MatchService, 
        FutbolDayService,
        UploadService,
        StadiumService
    ]

})
export class LayoutModule { }