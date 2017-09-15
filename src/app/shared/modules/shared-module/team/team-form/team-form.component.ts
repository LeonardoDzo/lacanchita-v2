
import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Team } from '../../../../../layout/teams/shared/team';
import { League } from '../../../../../layout/leagues/shared/league';
import { TeamService } from '../../../../../layout/teams/shared/team.service';
import { AuthGuard } from '../../../../guard/auth.guard';
@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  teamInit: Team;
  @Input() team: Team = new Team();
  @Input() league: League;
  @Output() objEmmit = new EventEmitter()
  constructor(private teamSvc: TeamService, private af: AuthGuard) { }

  ngOnInit() {
    this.teamInit = Object.assign({}, this.team);
    this.teamInit.$key = this.team.$key
  }

  createTeam() {
       this.team.createdBy = this.af.af.auth.currentUser.uid
       if (this.league) {
          this.team.leagues[this.league.$key] = true
          this.teamSvc.createItem(this.team, this.league.$key)
          this.league = new League() // reset item
       }else {
         this.teamSvc.createItem(this.team)
       }
  }
  update() {
    this.teamSvc.updateItem(this.team.$key, this.team, (upload) => {
      if (upload) {
        this.objEmmit.emit(upload)
      }
    })
  }
  cancel(){
    this.objEmmit.emit(this.teamInit)
  }
  handleImageUoload(event){
    this.team.imageUrl = event.url
  }

}
