import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { TournamentService } from './shared/tournament.service';
import { Tournament } from './shared/tournament';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
  animations: [routerTransition()]
})
export class TournamentsComponent implements OnInit {

  public tournaments: FirebaseListObservable<any[]>;

  constructor(
    private tournamentSvc: TournamentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tournaments = this.tournamentSvc.getItemsList({ limitToLast: 20 })
  }
  deleteItems() {
    this.tournamentSvc.deleteAll()
  }

}
