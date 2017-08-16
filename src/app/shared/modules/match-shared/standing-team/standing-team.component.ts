import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { subscribeToResult } from 'rxjs/util/subscribeToResult';
import { error } from 'util';
import { Team } from '../../../../layout/teams/shared/team';
import { Player } from '../../../../layout/players/shared/player';
import { Standing } from '../../../../layout/matches/shared/standing';
import { StandingService } from '../../../../layout/matches/shared/standing.service';
import { PlayerService } from '../../../../layout/players/shared/player.service';


@Component({
  selector: 'app-standing-team',
  templateUrl: './standing-team.component.html',
  styleUrls: ['./standing-team.component.scss']
})
export class StandingTeamComponent implements OnInit, OnChanges {
  @Input() match;
  @Input() team: Team;
  @Input() capturate: Boolean = false;
  alive = false

  standings: Standing[]
  players: Player[]
  constructor(private standingSvc: StandingService, private playerSvc: PlayerService) { }
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    for (let p in changes) {
      let c = changes[p];
      if (this.players) {
        this.players.forEach(player => {
          player.standing.player == player.$key
          if (player.standing.$key) {
            this.standingSvc.updateItem(player.standing.$key, player.standing, c => {
              if (c) {
              }
            })
          } else {
            this.standingSvc.createItem(player.standing)
          }
        })
      }
    }

  }
  ngOnInit() {
    if (this.capturate) {
      console.log("Se capturo")
    }
    var query = {
      orderByChild: "match",
      equalTo: this.match.$key
    };
    var query2 = {
      orderByChild: "teams/" + this.team.$key,
      equalTo: true
    };
    this.playerSvc.getItemsList(query2)
      .subscribe((players: [Player]) => {
        this.standingSvc.getItemsList(query).subscribe((standings: Standing[]) => {
          this.standings = standings
          this.players = players.map(t => {
            t.standing = this.standings.find(s => s.player == t.$key) ? this.standings.find(s => s.player == t.$key) : new Standing(this.match)
            t.standing.player = t.$key
            return t
          })
        }, error => console.log(), function () { })
      },
      error => console.log(),
      function () { })
  }

  onCapturate() {
  }
}
