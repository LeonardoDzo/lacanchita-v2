import { League } from '../../../layout/leagues/shared/league';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../../layout/teams/shared/team';
import { LeagueService } from '../../../layout/leagues/shared/league.service';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() team: Team
    @Output() event: EventEmitter<any> = new EventEmitter();
    leagues: League[] = []
    constructor(private leagueSvc: LeagueService) {
    }

    ngOnInit() {
        if (this.team != null) {
            var arr = []
            for (var key in this.team.leagues) {
                var lid = this.team.leagues[key];
                this.leagueSvc.getItem(key).subscribe((league: League) => {
                    arr.push({
                        name: league.title,
                        active: this.team.leagues[key]
                    })
                })
            }
            this.team.leagues = arr
        }
    }
}


