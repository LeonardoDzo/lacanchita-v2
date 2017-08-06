import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../../layout/matches/shared/match';
import { TeamService } from '../../../../layout/teams/shared/team.service';
import { Team } from '../../../../layout/teams/shared/team';
import { MatchService } from '../../../../layout/matches/shared/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss']
})
export class MatchItemComponent implements OnInit {

  @Input() match: Match = new Match()
  constructor(
    private teamSvc: TeamService,
    private matchSvc: MatchService,
    private router: Router) { }

  ngOnInit() {
    let List_teams: Team[] = []
    let List_match: Match[] = []
    this.teamSvc.getItemsList().subscribe(teams => {
      List_teams = teams
    })

    this.teamSvc.getItem(this.match.team1).subscribe(team => {
      this.match.team1 = team
    })
    this.teamSvc.getItem(this.match.team2).subscribe(team => {
      this.match.team2 = team
    })
  }
  onSelect() {
    this.router.navigate(['/match', this.match.$key]);
  }


}
