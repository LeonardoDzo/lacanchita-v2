
import { Tournament } from './../tournaments/shared/tournament';
import { TournamentService } from '../tournaments/shared/tournament.service';

import { TeamService } from '../teams/shared/team.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Team} from '../teams/shared/team';
import { LeagueService } from '../leagues/shared/league.service';
import { League } from '../leagues/shared/league';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    teams: Team[]
    leagues: League[]
     constructor(private teamSvc: TeamService, private tournamentSvc: TournamentService, private leagueSvc: LeagueService) {
    }

    ngOnInit() {
        const query = {
        };
        this.tournamentSvc.getItemsList({orderByChild: 'active', equalTo: true}).subscribe((t: Tournament[]) => {
            const tournament = t[0]
            this.leagueSvc.getItemsList({orderByChild: 'active/', equalTo: true}).subscribe((leagues: League[]) => {
                this.leagues = leagues.filter(l => {
                    console.log(l)
                    return l.tournamentId === tournament.$key && l.active
                })
                console.log(this.leagues)
                this.teams = []
                this.leagues.forEach(l1 => {
                    this.teamSvc.getItemsList({orderByChild: `leagues/${l1.$key}/`, equalTo: false}).subscribe((teams: Team[]) => {
                        console.log(teams)
                        teams.forEach(t2 => {
                            if (!this.teams.find(tid => tid.$key === t2.$key)) {
                                this.teams.push(t2)
                            }
                        })
                    })
                })

            })
        })
    }
}
