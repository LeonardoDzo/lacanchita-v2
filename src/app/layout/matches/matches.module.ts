import { DatepickerModule } from 'ngx-bootstrap';
import { SharedPipesModule } from '../../shared';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdChipsModule, MdSelectModule, MdOptionModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchSharedModule } from '../../shared/modules/match-shared/match-shared.module';
import { FormsModule } from '@angular/forms';
import { MatchesComponent } from './matches.component';
import { FilterPipe, SortByPipe } from '../../shared/pipes/pipes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    MatchesRoutingModule,
    MdChipsModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    MatchSharedModule,
    FormsModule,
    MdSnackBarModule,
    SharedPipesModule,
    NgbModule.forRoot()
  ],
  declarations: [MatchDetailComponent, MatchesComponent]
})
export class MatchesModule { }
