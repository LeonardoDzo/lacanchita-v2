import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../../layout/matches/shared/match';
import { Team } from '../../../../layout/teams/shared/team';
import { FutbolDay } from '../../futbol-day/shared/futbol-day';
import { MatchService } from '../../../../layout/matches/shared/match.service';
import { FutbolDayService } from '../../futbol-day/shared/futbol-day.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Stadium } from '../../../../layout/stadium/stadium';
import { StadiumService } from '../../../../layout/stadium/stadium.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss']
})
export class MatchFormComponent implements OnInit {

   @Input() match: Match = new Match();
  @Input() public teams: Team[] 
  @Input() matches: Match[] 
  
  team1: Team = new Team();
  team2: Team = new Team();
  turn: Boolean = true;
  lid: string = "";
  footballday: FutbolDay;
  stadiums: Stadium[];
  stadiumCtrl: FormControl;
  constructor(private stadiumSvc: StadiumService,
    private matchSvc: MatchService,
    private route: ActivatedRoute,
    private footballSvc: FutbolDayService) {
    this.stadiumCtrl = new FormControl();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(paramas => {
      this.lid = paramas['lid']
    })
    this.route.params
      .switchMap((params: Params) => this.footballSvc.getItem(params['id'], this.lid))
      .subscribe((footday: FutbolDay) => {
        this.footballday = footday
      })
    this.stadiumSvc.getItemsList().subscribe((stadiums: Stadium[]) => {
      this.stadiums = stadiums.filter(s => s.active)
    })
    var query = {
      limitToLast: 20,
      orderByChild: "footballDay",
      equalTo: this.footballday.$key
    };
    this.matchSvc.getItemsList(query).subscribe((matches: Match[]) => {
      this.matches = matches
      this.matches.forEach(match => {
        this.teams = this.teams.filter(t=>t.$key != match.team1).filter(t => t.$key != match.team2)
      })
    })

  }
  onSubmit() {
    if (this.team1[1] || this.team2[1] ){
        alert('Por favor ingresar un equipo en cada lado, verifique la información')
        return
    }
    if (this.team1[0] && this.team2[0]) {
      this.match.team1 = this.team1[0].$key
      this.match.team2 = this.team2[0].$key
      this.match.startDate = new Date(this.match.startDate).getTime()
      this.match.league = this.lid
      this.match.footballDay = this.footballday.$key
      this.matchSvc.createItem(this.match)
      this.team1 = null
      this.team2 = null 
    }else{
        alert('Por favor ingresar un equipo en cada lado, verifique la información')
        return
    }
    
  }
  onSelect(team: Team) {
    if (this.turn) {
      this.match.team1 = team.$key
      this.team1 = team
    } else {
      this.match.team2 = team.$key
      this.team2 = team
    }
    this.turn = !this.turn
  }
  getStyle(team: Team) {
    if (team.$key == this.team1.$key || team.$key == this.team2.$key) {
      return "lightblue";
    } else {
      return "";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let p in changes) {
      let c = changes[p];
      console.log(c.currentValue, c.previousValue)
    }

  }

}
