import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { League } from './shared/league';
import { LeagueService } from './shared/league.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
  animations: [routerTransition()]
})
export class LeaguesComponent implements OnInit {

  leagues: [League] = [null];
  constructor(
    private route: ActivatedRoute,
    private leagueSvc: LeagueService,
    private router: Router) {
  }

  ngOnInit() {
    this.leagueSvc.getItemsList({
      limitToLast: 20
    }).subscribe((leagues: [League]) => {
      this.leagues = leagues
    })

  }

}
