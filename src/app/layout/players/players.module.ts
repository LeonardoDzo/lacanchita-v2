import { PlayerShareModule } from '../../shared/modules/player-share/player-share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule,
    PlayerShareModule
  ],
  declarations: [PlayerComponent]
})
export class PlayersModule { }
