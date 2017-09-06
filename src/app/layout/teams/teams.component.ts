import { Component, OnInit } from '@angular/core';
import { TeamService } from './shared/team.service';
import { Team } from './shared/team';
import { slideToTop } from '../../router.animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [slideToTop()]
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  term: string;
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getItemsList({})
      .subscribe((teams: Team[]) => {
        this.teams = teams
      })
  }

}
