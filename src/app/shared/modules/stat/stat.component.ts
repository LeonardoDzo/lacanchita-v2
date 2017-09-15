import { League } from '../../../layout/leagues/shared/league';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../../layout/teams/shared/team';
import { LeagueService } from '../../../layout/leagues/shared/league.service';
import { TeamService } from 'app/layout/teams/shared/team.service';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() team: Team
    @Output() event: EventEmitter<any> = new EventEmitter();
    leagues: League[] = []
    flagEdit: boolean
    constructor(private leagueSvc: LeagueService,private teamSvc: TeamService) {
    }

    ngOnInit() {
        if (localStorage.getItem('rol') == '0') {
            this.flagEdit = true;
        }else{
            this.flagEdit = false;
        }
        if (this.team != null) {
            var arr = []
            for (var key in this.team.leagues) {
                var lid = this.team.leagues[key];
                this.leagueSvc.getItem(key).subscribe((league: League) => {
                    arr.push({
                        name: league.title,
                        active: this.team.leagues[key],
                        id: league.$key
                    })
                })
            }
            this.team.leagues = arr
        }

        var teams:Team[] = []
        this.teamSvc.allTeamsInactive()
        //console.log(teams)
    }

    pickLeague(id,ev) {
        console.log(this.team.leagues[0].id)
        const val = {}
        const t = {}
        this.team.leagues.forEach(l => {
            if (l.id === id && ev.target.checked) {
                val[l.id] = true;
                console.log(l.id+"::::::"+id)
                t[this.team.$key] = true;
                this.teamSvc.updateLeague(this.team.$key, l.$key,val)
                this.leagueSvc.addTeam(l.id, t)
            }else {
                val[l.id] = false;
                t[this.team.$key] = false;
                this.teamSvc.updateLeague(this.team.$key, l.$key,val)
                this.leagueSvc.addTeam(l.id, t)
            }
        })
    }
}


