import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TournamentService } from '../shared/tournament.service';
import { Tournament } from '../shared/tournament';
@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss']
})
export class TournamentFormComponent implements OnInit {
  tournamentInit : Tournament;
  @Input() tournament: Tournament = new Tournament();
  @Output() tournamentEmmit = new EventEmitter()
  constructor(private itemSvc: TournamentService) { }

  createTournament() {
    this.tournament.active = false
    this.itemSvc.createItem(this.tournament)
    this.tournament = new Tournament() // reset item
  }
  ngOnInit() {
    this.tournamentInit = Object.assign({}, this.tournament);
    this.tournamentInit.$key = this.tournament.$key
  }
  updateTournament() {
    this.itemSvc.updateItem(this.tournament.$key, this.tournament, (upload) => {
      if (upload) {
        this.tournamentEmmit.emit(upload)
      }
    })
  }
  cancel() {
    this.tournamentEmmit.emit(this.tournamentInit)
  }
}
