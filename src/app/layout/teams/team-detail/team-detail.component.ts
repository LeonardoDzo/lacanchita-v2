
import { Component, OnInit } from '@angular/core';
import { slideToRight } from '../../../router.animations';
import { Team } from '../shared/team';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
   animations: [slideToRight()] 
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  closeResult: string;
  constructor(private route: ActivatedRoute,
    private teamSvc: TeamService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.teamSvc.getItem(params['id']))
      .subscribe((team: Team) => {
        this.team = team
      });
  }

}
