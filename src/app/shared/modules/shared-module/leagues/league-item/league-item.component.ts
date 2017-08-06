import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { League } from '../../../../../layout/leagues/shared/league';
import { LeagueService } from '../../../../../layout/leagues/shared/league.service';

@Component({
  selector: 'app-league-item',
  templateUrl: './league-item.component.html',
  styleUrls: ['./league-item.component.scss']
})
export class LeagueItemComponent implements OnInit {
  @Input() league: League;
  selectedLeague: League = null;
  constructor(private leagueSvc: LeagueService,
   private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onEdit(league: League){
    this.selectedLeague = league
  }
  
  updated(event){
    this.league = event
    this.selectedLeague = null
  }

  onSelect(league: League) {
     console.log("Meselecciono a mi")
     this.router.navigate(['leagues', league.$key]);
  }
  deleteItem() {
    this.leagueSvc.deleteItem(this.league.$key)
  }

}
