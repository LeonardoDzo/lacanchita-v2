import { MdButtonModule, MdDatepickerModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadModule } from '../upload-module/upload-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerItemComponent } from './player-item/player-item.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { FormsModule, Validators } from '@angular/forms';
import { PlayerService } from '../../../layout/players/shared/player.service';
import { PlayerItem2Component } from './player-item2/player-item2.component';

@NgModule({
  imports: [
    CommonModule,
    UploadModule,
    FormsModule,
    NgbModule.forRoot(),
    MdButtonModule,
    MdDatepickerModule,
    MdInputModule,
    MdSnackBarModule
  ],
  declarations: [PlayerItemComponent, PlayerFormComponent, PlayerItem2Component],
  exports: [PlayerItemComponent, PlayerFormComponent, PlayerItem2Component],
  providers: [PlayerService]
})
export class PlayerShareModule { }
