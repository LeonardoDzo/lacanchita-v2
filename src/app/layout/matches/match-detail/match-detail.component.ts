import { Component, OnInit } from '@angular/core';
import { Match } from '../shared/match';
import { Team } from '../../teams/shared/team';
import { Stadium } from '../../stadium/stadium';
import { StadiumService } from '../../stadium/stadium.service';
import { MatchService } from '../shared/match.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../players/shared/player.service';
import { StandingService } from '../shared/standing.service';
import { TeamService } from '../../teams/shared/team.service';
import { MdSnackBar } from '@angular/material';
import { slideToTop } from '../../../router.animations';
import { Standing } from '../shared/standing';
@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  animations: [slideToTop()]
})
export class MatchDetailComponent implements OnInit {

  match: Match = new Match();
  team1: Team = new Team();
  team2: Team = new Team();
  stadium: Stadium = new Stadium()
  stadiums: Stadium[] = []
  capturate = false;
  alive = false;
  constructor(public snackBar: MdSnackBar,
    private matchSvc: MatchService,
    private stadiumSvc: StadiumService,
    private route: ActivatedRoute,
    private teamSvc: TeamService,
    private playerSvc: PlayerService,
    private standingSvc: StandingService) { }

  ngOnInit() {
    this.route.params.switchMap(params => this.matchSvc.getItem(params['id']))
      .subscribe(match => {
        this.match = match
        var query = {
          orderByChild: "match",
          equalTo: this.match.$key
        };
        this.stadiumSvc.getItemsList().subscribe((stadiums: Stadium[]) => {
          this.stadiums = stadiums.filter(s => s.active)
          this.stadium = stadiums.find(s => s.$key == this.match.stadium)
        })
        this.standingSvc.getItemsList(query).subscribe((standings: Standing[]) => {
          this.teamSvc.getItem(this.match.team1).subscribe(team => {
            this.team1 = team
          })
          this.teamSvc.getItem(this.match.team2).subscribe(team => {
            this.team2 = team
          })
        })

      })
  }
  update() {
    var value = {}
    value["result1"] = this.match.result1
    value["result2"] = this.match.result2
    value["done"] = this.match.done
    this.matchSvc.captureResult(value, snapshot => {
      this.snackBar.open("Resultados capturados", "", {
        duration: 2000,
      });
    })
    this.capturate = true
  }
  onEdit() {
    this.alive = !this.alive
  }
  onSubmit() {
    this.matchSvc.updateItem(this.match.$key, this.match, c => {
      this.alive = !this.alive
    })
  }

}
