import { OnInit } from '@angular/core';
import { Player } from '../../players/shared/player';

export class Team {
    $key: string;
    title: string;
    dateCreated: number;
    active: boolean = true;
    players: Player[] = [];
    leagues: [any] = [null];
    imageUrl: string;
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}
