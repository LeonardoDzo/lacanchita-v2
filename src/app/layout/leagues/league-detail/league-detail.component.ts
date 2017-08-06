import { Component, OnInit } from '@angular/core';
//services
import { TeamService } from '../../teams/shared/team.service';
import { LeagueService } from '../shared/league.service';
//models
import { Team } from '../../teams/shared/team';
import { League } from '../shared/league';
//Others
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { slideToTop, slideToRight,fadeInAnimation } from '../../../router.animations';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss'],
  animations: [slideToRight()]
})
export class LeagueDetailComponent implements OnInit {
  league: League;
  teams: Team[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private leagueSvc: LeagueService,
    private teamService: TeamService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.leagueSvc.getItem(params['id']))
      .subscribe((league: League) => {
        this.league = league
        var query = {
          orderByChild: "leagues/" + this.league.$key,
          equalTo: true
        };
        this.teamService.getItemsList(query)
          .subscribe((teams: Team[]) => {
            this.teams = teams
          })
      });
      
  }

}

