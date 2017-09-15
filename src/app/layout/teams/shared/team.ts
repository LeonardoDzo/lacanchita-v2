import { OnInit } from '@angular/core';
import { Player } from '../../players/shared/player';

export class Team {
    $key: string;
    title: string;
    dateCreated: number;
    active = true;
    players: any[] = [];
    leagues: any[] = [];
    imageUrl: string;
    createdBy: string;
    // tslint:disable-next-line:one-line
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}
