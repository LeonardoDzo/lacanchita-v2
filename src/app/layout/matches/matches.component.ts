import { ISubscription } from 'rxjs/Subscription';
import { VERSION } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchService } from './shared/match.service';
import { Match } from './shared/match';
import { TeamService } from '../teams/shared/team.service';
import { LeagueService } from '../leagues/shared/league.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Match[]
  startDate: Date
  endDate: Date
  private subscription: ISubscription;
  term: String;
  constructor(private matchSvc: MatchService, private teamSvc: TeamService, private leagueSvc: LeagueService) {
  }
 
  ngOnInit() {
    var query = {
    };
    this.subscription = this.matchSvc.getItemsList(query).subscribe((matches: Match[]) => {
      this.matches = matches
      this.matches.forEach((match, index) => {
        this.teamSvc.getItem(match.team1).subscribe(team => {
          this.matches[index].team1 = team
        })
        this.teamSvc.getItem(match.team2).subscribe(team => {
          this.matches[index].team2 = team
        })
        this.leagueSvc.getItem(match.league).subscribe(league => {
          this.matches[index].league = league
        })
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
