import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { League } from '../../../../../layout/leagues/shared/league';
import { Tournament } from '../../../../../layout/tournaments/shared/tournament';
import { LeagueService } from '../../../../../layout/leagues/shared/league.service';


@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
})
export class LeagueFormComponent implements OnInit {
  leagueInit : League;
  @Input() league: League = new League();
  @Input() tournament: Tournament;
  @Output() objEmmit = new EventEmitter()
  constructor(private leagueSvc: LeagueService) { }

  ngOnInit() {
    this.leagueInit = Object.assign({}, this.league);
    this.leagueInit.$key = this.league.$key
  }
  onSubmit() {
    this.league.tournamentId = this.tournament.$key
    this.leagueSvc.createItem(this.league)
    this.league = new League() // reset item
  }

  update() {
    this.leagueSvc.updateItem(this.league.$key, this.league, (upload) => {
      if (upload) {
        this.objEmmit.emit(upload)
      }
    })
  }
  newLeague() {
    this.league = new League() // reset item
  }
  cancel() {
    this.objEmmit.emit(this.leagueInit)
  }

}
