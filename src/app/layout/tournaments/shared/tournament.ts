export class Tournament {
    $key: string;
    title: string;
    timeStamp: Date = new Date();
    active: boolean = true;
    leagues: [any];
}

