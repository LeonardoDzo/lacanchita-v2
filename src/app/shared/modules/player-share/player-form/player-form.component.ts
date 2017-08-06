import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../../layout/teams/shared/team';
import { Player } from '../../../../layout/players/shared/player';
import { PlayerService } from '../../../../layout/players/shared/player.service';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  @Input() team: Team;
  player: Player = new Player();
  constructor(private playerSvc: PlayerService) { }

  ngOnInit() {
  }
  createPlayer() {
    if (!this.player.imageUrl) {
      alert("Suba la imagen")
    } else {
      if (this.team){
        this.player.teams[this.team.$key] = true
      }
      this.playerSvc.createItem(this.player)
      this.player = new Player() // reset item
    }

  }
  handleImageUoload(event) {
    this.player.imageUrl = event.url
  }
  generatePlayers() {
    for (var i = 1; i <= 8; i++) {
      this.player.teams[this.team.$key] = true
      this.player.name = "Jugador ".concat(this.team.title + " ").concat(i.toString())
      this.player.shirtNumber = i
      this.playerSvc.createItem(this.player)
      this.player = new Player() // reset item
    }
  }

}
