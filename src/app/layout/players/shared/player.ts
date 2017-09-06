import { Standing } from '../../matches/shared/standing';
export class Player {
    $key: string;
    name: string;
    birth: Date;
    shirtNumber: number;
    teams: Array<any> = [];
    leagues: Array<any> = [];
    phone: number;
    email: string;
    imageUrl: string;
    standing: Standing;
}
