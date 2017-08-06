import { Match } from './match';
export class Standing {
    $key: string;
    player: string;
    league: string;
    match: string;
    footballday: string;
    play: Boolean = false;
    yellowCards: number = 0;
    redCards: number = 0;
    goals: number = 0;
    
    constructor(match: Match){
        this.footballday = match.footballDay
        this.league = match.league
        this.match =  match.$key
    }
}
