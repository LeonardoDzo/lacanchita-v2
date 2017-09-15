
import { TeamService } from '../teams/shared/team.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Team} from '../teams/shared/team';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    teams : Team[]
    constructor(private teamSvc: TeamService) {
    }

    ngOnInit() {
        var query = {
          orderByChild: "active",
          equalTo: false
        };
        this.teamSvc.getItemsList(query).subscribe( (teams: Team[]) => {
            this.teams = teams
        })
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
