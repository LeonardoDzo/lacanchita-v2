import { FormsModule } from '@angular/forms';
import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { PlayerShareModule } from './../../shared/modules/player-share/player-share.module';
import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from '../../shared/modules/shared-module/shared-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { UploadModule } from '../../shared/modules/upload-module/upload-module.module';
import { MdTabsModule, MdDialogModule, MdSlideToggleModule, MdCardModule, MdInputModule, MdSnackBarModule, MdRadioModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModuleModule,
    FormsModule,
    UploadModule,
    NgbModule.forRoot(),
    MdTabsModule,
    MdSlideToggleModule,
    MdCardModule,
    PlayerShareModule,
    MdDialogModule,
    MdInputModule,
    MdSnackBarModule,
    SharedPipesModule,
    MdRadioModule
  ],
  declarations: [TeamsComponent, TeamDetailComponent]
})
export class TeamsModule { }
