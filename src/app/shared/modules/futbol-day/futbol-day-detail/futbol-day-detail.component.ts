import { slideToRight } from '../../../../router.animations';
import { Component, OnInit } from '@angular/core';
import { FutbolDay } from '../shared/futbol-day';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FutbolDayService } from '../shared/futbol-day.service';
import { LeagueService } from '../../../../layout/leagues/shared/league.service';
import { MatchService } from '../../../../layout/matches/shared/match.service';
import { TeamService } from '../../../../layout/teams/shared/team.service';
import { Match } from '../../../../layout/matches/shared/match';
import { Team } from '../../../../layout/teams/shared/team';

@Component({
  selector: 'app-futbol-day-detail',
  templateUrl: './futbol-day-detail.component.html',
  styleUrls: ['./futbol-day-detail.component.scss'],
  animations: [slideToRight()]
})
export class FutbolDayDetailComponent implements OnInit {
  teams: Team[];
  matches: Match[];
  footballday: FutbolDay;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private leagueSvc: LeagueService,
    private footballSvc: FutbolDayService,
    private matchSvc: MatchService,
    private teamSvc: TeamService
  ) { }

  ngOnInit() {
    var lid: string;

    this.route.queryParams.subscribe(params => {
      lid = params['lid']
      console.log(lid)
      var query = {
        limitToLast: 10,
        orderByChild: "leagues/" + lid,
        equalTo: true
      };
      this.teamSvc.getItemsList(query)
        .subscribe((teams: [Team]) => {
          this.teams = teams
        })
    })
    this.route.params
      .switchMap((params: Params) =>
        this.footballSvc.getItem(params['id'], lid))
      .subscribe((footday: FutbolDay) => {
        this.footballday = footday
        var query = {
          limitToLast: 10,
          orderByChild: "footballDay",
          equalTo: this.footballday.$key
        };
        this.matchSvc.getItemsList(query).subscribe((matches: Match[]) => {
          this.matches = matches
        })
      })


  }

}
