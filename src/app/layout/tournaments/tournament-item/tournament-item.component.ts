import {$} from 'protractor/built';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { duration } from 'moment';
import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../shared/tournament.service';
import { Tournament } from '../shared/tournament';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss']
})
export class TournamentItemComponent implements OnInit {

  @Input() tournament: Tournament = new Tournament();
  selectedTournament: Tournament = null;
  allTournaments: Tournament[] = []
  constructor(private itemSvc: TournamentService,
   private route: ActivatedRoute,
    private router: Router,
    private snackBar: MdSnackBar,
    private modal: NgbModal) { }

  onEdit(tournament: Tournament, content) {
    this.selectedTournament = tournament
  }

  updated(event) {
    this.tournament = event
    this.selectedTournament = null
  }

  activate(newValue) {
      console.log(newValue)
      if (this.allTournaments.length && newValue) {
        this.allTournaments.map(t => this.desactivate(t) )
      }

      this.itemSvc.updateItem(this.tournament.$key, {'active': newValue}, callback => {
        this.snackBar.open(callback, '', {
            duration: 5000,
            extraClasses: ['default']
        })
    })
  }

  desactivate(tournament: Tournament) {
    this.itemSvc.updateItem(tournament.$key, {'active': false}, callback => {
    })
  }

  onSelect(tournament: Tournament) {
    this.router.navigate(['tournaments', tournament.$key]);
  }
  deleteItem() {
      alert()
    this.itemSvc.deleteItem(this.tournament.$key)
  }

  ngOnInit() {
    this.itemSvc.getItemsList({}).subscribe((ts: Tournament[]) => {
        this.allTournaments = ts
    })
  }

}

