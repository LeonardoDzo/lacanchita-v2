import { BsModalRef } from 'ngx-bootstrap/modal';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdSnackBar } from '@angular/material';
import { PlayerService } from './../../players/shared/player.service';

import { LeagueService } from '../../leagues/shared/league.service';
import { query } from '@angular/core/src/animation/dsl';

import { Component, OnInit } from '@angular/core';
import { slideToRight } from '../../../router.animations';
import { Team } from '../shared/team';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TeamService } from '../shared/team.service';
import { League } from '../../leagues/shared/league';
import { Player } from '../../players/shared/player';
import { TournamentService } from '../../tournaments/shared/tournament.service';
import { Tournament } from '../../tournaments/shared/tournament';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss'],
    animations: [slideToRight()]
})

export class TeamDetailComponent implements OnInit {
    team: Team;
    leagues: League[] = []
    players: Player[] = []
    allPlayers: Player[] = []
    closeResult: string;
    leaguesAvaible: League[] = []
    disabled = true
    public modalRef: BsModalRef

    flagEdit: boolean;
    constructor(private route: ActivatedRoute,
        private teamSvc: TeamService,
        private leagueSvc: LeagueService,
        private playerSvc: PlayerService,
        private router: Router,
        public snackBar: MdSnackBar,
        private modalService: NgbModal,
        private tournSvc: TournamentService) { }

    ngOnInit() {
        if (localStorage.getItem('rol') == '0') {
            this.flagEdit = true;
            this.disabled = false
        }else{
            this.flagEdit = false;
        }
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.teamSvc.getItem(params['id']))
            .subscribe((team: Team) => {
                this.team = team
                this.getLeagues()
                this.getPlayers()
            });
        const query = {
        }
        this.tournSvc.getItemsList({}).subscribe((tournaments: Tournament[] ) => {
            console.log(tournaments)
            const tournament = tournaments.find(t => t.active)
            this.leagueSvc.getItemsList({}).subscribe((leagues: League[]) => {
                this.leaguesAvaible = leagues.filter(l => l.tournamentId === tournament.$key)
          })
      })
        this.playerSvc.getItemsList(query).subscribe((players: Player[]) => {
            this.allPlayers = players.filter(p => {
                if (p.teams !== undefined && p.teams[this.team.$key]) {
                    return false
                }
                return true
            })
        })
    }
    pickLeague(id) {
        const val = {}
        this.leaguesAvaible.forEach(l => {
            if (l.$key === id) {
                this.teamSvc.addLeague(this.team.$key, l.$key,this.flagEdit)
            }else {
                this.teamSvc.addLeague(this.team.$key,  l.$key, false)
            }
        })
    }

    getLeagues() {
        this.leagues = []
        // tslint:disable-next-line:forin
        for (const i in this.team.leagues) {
            this.leagueSvc.getItem(i)
                .subscribe(league => {
                    this.leagues.push(league)
                })
        }
    }
    getPlayers() {
        this.players = []
        // tslint:disable-next-line:forin
        for (const i in this.team.players) {
            this.playerSvc.getItem(i)
                .subscribe((p: Player) => {
                    if (p.name) {
                        this.players.push(p)
                    }

                })
        }
    }
    open(content) {
       this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //
        });
    }

    playerCreated($event) {
        const val = {}
        val[$event.$key] = true
        const value = {}
        value[this.team.$key] = true
        this.playerSvc.addTeam($event.$key, value)
        this.teamSvc.addPlayer(this.team.$key, val, res => {
            if (res) {
                this.snackBar.open(`Jugador Agregado a`, this.team.title, {
                    duration: 2000,
                    extraClasses: ['success']
                });
                this.getPlayers()
            } else {
                this.snackBar.open(`No se pude agregar al equipo`, this.team.title, {
                    duration: 2000,
                });
            }
        })
    }
}
