import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from '../../shared/modules/shared-module/shared-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { MdDialogModule } from "@angular/material";
import { UploadModule } from '../../shared/modules/upload-module/upload-module.module';



@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModuleModule,
    UploadModule,
    NgbModule.forRoot()
  ],
  declarations: [TeamsComponent, TeamDetailComponent]
})
export class TeamsModule { }
