import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../../../layout/players/shared/player';
import { PlayerService } from '../../../../layout/players/shared/player.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss']
})
export class PlayerItemComponent implements OnInit {

  @Input() player: Player;
  constructor(private playerSvc: PlayerService
            ) { }
  ngOnInit() {
  }
  delete() {
    this.playerSvc.deleteItem(this.player.$key)
  }
}
