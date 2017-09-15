import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Team } from '../../../../layout/teams/shared/team';
import { Player } from '../../../../layout/players/shared/player';
import { PlayerService } from '../../../../layout/players/shared/player.service';
import { MdSnackBar } from '@angular/material';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
    selector: 'app-player-form',
    templateUrl: './player-form.component.html',
    styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
    formPlayer = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(EMAIL_REGEX)]);
    @Input() team: Team;
    player: Player = new Player();
    @Output() playerEmit = new EventEmitter()
    constructor(private playerSvc: PlayerService, public snackBar: MdSnackBar) { }

    ngOnInit() {
    }
    createPlayer() {

        if (this.team) {
            this.player.teams[this.team.$key] = true
        }
        this.playerSvc.createItem(this.player, (p: Player) => {
            if (p.$key) {
                this.playerEmit.emit(p)
                this.snackBar.open('Jugador Agregado', '', {
                    duration: 2000,
                    extraClasses: ['success']
                });
            }
        })
        this.player = new Player() // reset item

    }
    handleImageUoload(event) {
        this.player.imageUrl = event.url
    }
}
