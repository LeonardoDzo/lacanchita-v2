import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TournamentService } from '../shared/tournament.service';
import { Tournament } from '../shared/tournament';
@Component({
  selector: 'tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss']
})
export class TournamentItemComponent implements OnInit {

  @Input() tournament: Tournament = new Tournament();
  selectedTournament: Tournament = null;

  constructor(private itemSvc: TournamentService,
   private route: ActivatedRoute,
    private router: Router) { }

  onEdit(tournament: Tournament){
    this.selectedTournament = tournament
  }
  
  updated(event){
    this.tournament = event
    this.selectedTournament = null
  }

  onSelect(tournament: Tournament) {
    this.router.navigate(['tournaments', tournament.$key]);
  }
  deleteItem() {
    this.itemSvc.deleteItem(this.tournament.$key)
  }

  ngOnInit() {
  }

}

