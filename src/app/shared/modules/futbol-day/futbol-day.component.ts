import { Component, OnInit, Input } from '@angular/core';
import { FutbolDay } from './shared/futbol-day';

import { FutbolDayService } from './shared/futbol-day.service';
import { League } from '../../../layout/leagues/shared/league';
import { Team } from '../../../layout/teams/shared/team';
import { Match } from '../../../layout/matches/shared/match';
import { MatchService } from '../../../layout/matches/shared/match.service';
import { TeamService } from '../../../layout/teams/shared/team.service';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-futbol-day',
    templateUrl: './futbol-day.component.html',
    styleUrls: ['./futbol-day.component.scss']
})
export class FutbolDayComponent implements OnInit {

    @Input() league: League
    journeys: FutbolDay[] = []
    matches: Match[] = []
    teams: Team[] = []

    constructor(private journeySvc: FutbolDayService,
        private matchSvc: MatchService,
        private teamSvc: TeamService,
        private snackBar: MdSnackBar) { }

    ngOnInit() {
        enum Days { sunday, monday, tuesday, wednesdat, thursday, friday, saturday }
        this.journeySvc.getItemsList({ limitToLast: 11 }, this.league.$key)
            .subscribe((journeys: [FutbolDay]) => {
                this.journeys = journeys
            })
        var queryMatch = {
            limitToLast: 20,
            orderByChild: "league",
            equalTo: this.league.$key
        }

        this.matchSvc.getItemsList(queryMatch).subscribe((matches: Match[]) => {
            this.matches = matches
        })

        var query = {
            limitToLast:20,
            orderByChild: "leagues/" + this.league.$key,
            equalTo: true
        };
        this.teamSvc.getItemsList(query)
            .subscribe((teams: [Team]) => {
                this.teams = teams
            })
    }
    onGenerate() {
        this.onCreateFootballDays(11);
        this.journeys.forEach(footballday => {
            this.onGenerateMatch(footballday)
        })
    }


    onCreateFootballDays(times: number) {
        for (var i = 0; i < times; i++) {
            let footballDay: FutbolDay = new FutbolDay()
            var number = i + 1
            footballDay.title = "Jornada ".concat(number.toString())
            this.journeySvc.createItem(footballDay, this.league.$key, callback => {
                if (callback) {
                    this.snackBar.open('Agregado correctamente', null, {
                        duration: 5000,
                        extraClasses: ['success']
                    })
                } else {
                    this.snackBar.open('algo salio mal', null, {
                        duration: 5000,
                        extraClasses: ['success']
                    })
                }
            })
        }
    }

    onGenerateMatch(footballday: FutbolDay) {
        var match: Match = new Match();
        match.footballDay = footballday.$key
        match.league = this.league.$key

        //Sumar fecha inicial mas hora de inicio
        //Por cada juego creado verificar que este entre hora inicio y hora final si no saltar al siguiente día disponible
        //Una vez creado sumarle los minutos que se juegan

        for (var i = 0; i < this.teams.length / 2; i++) {
            let teams: Team[] = this.teams
            var query = {
                limitToLast: 20,
                orderByChild: "footballDay",
                equalTo: match.footballDay
            };
            //Teams available on this football day
            this.matchSvc.getItemsList(query).subscribe((matches: Match[]) => {
                matches.forEach(match => {
                    teams = teams.filter(t => t.$key != match.team1).filter(t => t.$key != match.team2)
                })
                if (teams.length > 0) {
                    this.onCreateMatch(match, teams)
                }

            })
        }
    }

    onCreateMatch(match: Match, teams: Team[]) {
        teams.every(team1 => {
            let team2 = teams.find(t => t.$key != team1.$key);
            var rest: Team[] = teams
            if (team2 && team1.$key != team2.$key) {
                if (!this.matches.find(m => (m.team1 == team1.$key && m.team2 == team2.$key) ||
                    (m.team2 == team1.$key && m.team1 == team2.$key)
                )) {
                    match.team1 = team1.$key
                    match.team2 = team2.$key
                    this.matchSvc.createItem(match)
                    return false
                }
            }
            return true
        })
    }

}
