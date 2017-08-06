import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../../layout/teams/shared/team';

@Component({
  selector: 'app-team-pick',
  templateUrl: './match-pick.component.html',
  styleUrls: ['./match-pick.component.scss']
})
export class MatchPickComponent implements OnInit {

  @Input() team: Team = new Team()
  constructor() { }

  ngOnInit() {
  }

}
