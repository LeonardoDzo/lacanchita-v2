import { PageHeaderModule } from '../../shared/modules';
import { LeaguesModule } from '../leagues/leagues.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentService } from './shared/tournament.service';
import { TournamentItemComponent } from './tournament-item/tournament-item.component';
import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentFormComponent } from './tournament-form/tournament-form.component';
import { NgbAccordionModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { MdCardModule, MdSnackBarModule } from '@angular/material';
import { PageHeaderComponent } from '../../shared/modules/page-header/page-header.component';
import { TournamentsComponent } from './tournaments.component';
import { SharedModuleModule } from '../../shared/modules/shared-module/shared-module.module';


@NgModule({
    imports: [
        CommonModule,
        TournamentRoutingModule,
        FormsModule,
        PageHeaderModule,
        NgbAccordionModule,
        MdCardModule,
        MdSnackBarModule,
        SharedModuleModule,
        NgbModalModule,
        NgbModule.forRoot()
    ],
    declarations: [
      TournamentsComponent,
      TournamentFormComponent,
      TournamentItemComponent,
      TournamentDetailsComponent
    ]

})
export class TournamentsModule { }
