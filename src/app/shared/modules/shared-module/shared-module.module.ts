import { FormsModule } from '@angular/forms';
import { LeagueFormComponent } from './leagues/league-form/league-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueItemComponent } from './leagues/league-item/league-item.component';
import { MdCardModule, MdButtonModule, MdSnackBarModule } from '@angular/material';
import { TeamItemComponent } from './team/team-item/team-item.component';
import { TeamFormComponent } from './team/team-form/team-form.component';
import { UploadModule } from '../upload-module/upload-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCardModule,
    MdButtonModule,
    UploadModule,
    MdSnackBarModule
  ],
  exports: [LeagueItemComponent,LeagueFormComponent,TeamItemComponent, TeamFormComponent],
  declarations: [LeagueItemComponent,LeagueFormComponent, TeamItemComponent, TeamFormComponent ]
})

export class SharedModuleModule { }
