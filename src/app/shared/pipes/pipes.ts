import { Team } from './../../layout/teams/shared/team';
import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../../layout/matches/shared/match';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Match[], term: String): any {
        if (term) {
            term = term.toLowerCase();
        }
        console.log(items)
        return term
            ? items.filter(item => item.team1.title.toLowerCase().indexOf(term) !== -1 || item.team2.title.toLowerCase().indexOf(term) !== -1 || item.league.title.toLowerCase().indexOf(term) !== -1 )
            : items;
    }
}

@Pipe({
    name: 'startdate',
    pure: false
})
export class StartDatePipe implements PipeTransform {
    transform(items: Match[], term: any): any {
        if (term) {
         term =  new Date(term.year, term.month - 1, term.day, 0).getTime()
        }
        return term ? items.filter(item =>
                        term <= item.startDate
                    ) : items
    }
}
@Pipe({
    name: 'teamPipe',
    pure: false
})
export class TeamPipe implements PipeTransform {
    transform(items: Team[], term: string): any {
        if (term) {
         term = term.toLowerCase()
        }
        return term ? items.filter(item =>
                        item.title.toLowerCase().indexOf(term) !== -1
                    ) : items
    }
}
@Pipe({
    name: 'enddate',
    pure: false
})
export class EndDatePipe implements PipeTransform {
    transform(items: Match[], term: any): any {
        if (term) {
         term =  new Date(term.year, term.month - 1, term.day, 23).getTime()
        }
        return term ? items.filter(item =>
                        term >= item.startDate
                    ) : items
    }
}

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        return items.sort((a, b) => b[sortedBy] - a[sortedBy]);
    }
}
