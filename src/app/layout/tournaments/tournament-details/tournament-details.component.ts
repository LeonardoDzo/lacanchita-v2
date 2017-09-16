import { Component, OnInit } from '@angular/core';
import { Tournament } from '../shared/tournament';
import { League } from '../../leagues/shared/league';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LeagueService } from '../../leagues/shared/league.service';
import { TournamentService } from '../shared/tournament.service';
import { routerTransition, slideToRight } from '../../../router.animations';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
  animations: [slideToRight()]
})
export class TournamentDetailsComponent implements OnInit {
  tournament: Tournament = null;
  leagues: [League] = [null];
  constructor(
    private route: ActivatedRoute,
    private leagueSvc: LeagueService,
    private router: Router,
    private tournamentSvc: TournamentService) {
  }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.tournamentSvc.getItem(params['id']))
      .subscribe((tournament: Tournament) => {
        this.tournament = tournament
        this.leagueSvc.getItemsList({
          limitToLast: 20,
          orderByChild: "tournamentId",
          equalTo: tournament.$key
        }).subscribe((leagues: [League]) => {
          this.leagues = leagues
        })
      });

  }
}
