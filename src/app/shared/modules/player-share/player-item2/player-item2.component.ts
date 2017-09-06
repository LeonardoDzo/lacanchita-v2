import { Player } from '../../../../layout/players/shared/player';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-item2',
  templateUrl: './player-item2.component.html',
  styleUrls: ['./player-item2.component.scss']
})
export class PlayerItem2Component implements OnInit {
  @Input() player: Player;
  constructor() { }

  ngOnInit() {
  }

}
