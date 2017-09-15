import { User } from './../user/shared/user';
import { UserService } from '../user/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { TeamService } from './shared/team.service';
import { Team } from './shared/team';
import { slideToTop } from '../../router.animations';
import { query } from '@angular/core/src/animation/dsl';
import { AuthGuard } from '../../shared/guard/auth.guard';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [slideToTop()]
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  term: string;
  user: User;
  constructor(private teamService: TeamService, private userSvc: UserService, private authSvc: AuthGuard) { }

  ngOnInit() {
    const uid = localStorage.getItem('uid')
    this.userSvc.getItem(uid).subscribe(user => {
        this.user = user
        let query = {
          };
        if (this.user.rol === 1) {
            console.log(this.user.$key)
            query = {
                orderByChild: 'createdBy',
                equalTo: this.user.$key
            }
        }
        this.teamService.getItemsList(query)
        .subscribe((teams: Team[]) => {
          this.teams = teams.filter(t => t.active)
        })

    })
  }

}
