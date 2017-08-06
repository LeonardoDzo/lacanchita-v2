import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadModule } from '../upload-module/upload-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerItemComponent } from './player-item/player-item.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../../layout/players/shared/player.service';

@NgModule({
  imports: [
    CommonModule,
    UploadModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [PlayerItemComponent, PlayerFormComponent],
  exports: [PlayerItemComponent, PlayerFormComponent],
  providers: [PlayerService]
})
export class PlayerShareModule { }
