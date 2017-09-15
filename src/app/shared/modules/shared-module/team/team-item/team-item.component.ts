import { TournamentService } from '../../../../../layout/tournaments/shared/tournament.service';
import { LeagueService } from './../../../../../layout/leagues/shared/league.service';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../../../../layout/teams/shared/team';
import { TeamService } from '../../../../../layout/teams/shared/team.service';
import { League } from '../../../../../layout/leagues/shared/league';
import { Tournament } from '../../../../../layout/tournaments/shared/tournament';
@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent implements OnInit {
  @Input() team: Team;
  edit= false
  permissionForDelete = false
  leagues: League[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private teamSvc: TeamService,
    private leagueSvc: LeagueService,
    private tournSvc: TournamentService
  ) { }

  ngOnInit() {
      const rol = localStorage.getItem('rol')
      if ( rol != null && rol === '0') {
            this.permissionForDelete = true
      }
      this.tournSvc.getItemsList({}).subscribe((tournaments: Tournament[] ) => {
            console.log(tournaments)
            const tournament = tournaments.find(t => t.active)
            this.leagueSvc.getItemsList({}).subscribe((leagues: League[]) => {
                this.leagues = leagues.filter(l => l.tournamentId === tournament.$key)
                console.log(this.leagues)
          })
      })
  }
  onSelect() {
    this.router.navigate(['/teams', this.team.$key]);
  }
  onEdit(content) {
     this.modalService.open(content).result.then((result) => {
      // Button
    }, (reason) => {
      // Background or esc
    });
  }
  updated(event) {
    this.team = event
  }
  delete() {
    this.teamSvc.deleteItem(this.team.$key)
  }
}
