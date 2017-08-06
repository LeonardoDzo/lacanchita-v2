export class League {
    $key: string;
    title: string;
    dateCreated: number;
    active: boolean = true;
    teamsQualifiers: number;
    tournamentId: string;
    teams: [any] 
    startDate: Date;
    gameDay: String;
    gameDuration: String;
    timeFirstGame: String;
    timeLastGame: String;
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}
