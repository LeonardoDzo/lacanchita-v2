import { validateComponent } from 'codelyzer/walkerFactory/walkerFn';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Team } from './team';
import { LeagueService } from '../../leagues/shared/league.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class TeamService {


    private basePath = '/teams';

    teams: FirebaseListObservable<any[]> = null; //  list of objects
    team: FirebaseObjectObservable<any>; //   single object

    constructor(private db: AngularFireDatabase,
        private leagueSvc: LeagueService,
        public af: AngularFireAuth) {

    }
    getItemsList(query = {}): FirebaseListObservable<any[]> {
        if (localStorage.getItem('uid')) {
            this.teams = this.db.list(this.basePath, {
                query: query
            });
            return this.teams
        }
        return null
    }
    // Return a single observable item
    getItem(key: string): FirebaseObjectObservable<any> {
        if (key.length > 0) {
            const itemPath = `${this.basePath}/${key}`;
            this.team = this.db.object(itemPath)
            return this.team
        }
    }

    createItem(item: Team, lid: string = null): void {
        item.createdBy = localStorage.getItem('uid')
        this.db.app.database().ref(this.basePath).push(item).then(res => {
            if (lid) {
                const value = {}
                value[item.$key] = false
                this.leagueSvc.addTeam(lid, value)
            }
        })
            .catch(error => this.handleError(error))
    }
    // Update an existing item
    updateItem(key: string, value: any, callback): void {
        this.teams.update(key, value)
            .then(snapshot => {
                callback(true)
            })
            .catch(error => {
                this.handleError(error)
                callback(false)
            })
    }
    delteLeague(key: string, lid: string): void {
       this.db.database.ref(`${this.basePath}/${key}/leagues/${lid}`).remove()
    }
    addLeague(key: string, lid: string): void {
        this.db.database.ref(`${this.basePath}/${key}/leagues/${lid}`).set(false)
     }
    addPlayer(key: string, value: any, callback): void {
        this.db.database.ref(`teams/${key}/players`).update(value, error => {
            if (error) {
                callback(false)
            }else {
              callback(true)
            }
        })
    }
    // Deletes a single item
    deleteItem(key: string): void {
        const val = {}
        val['active'] = false
        this.db.database.ref(`${this.basePath}/${key}`).update(val, error => {
            if (error) {
                alert('Eliminado incorrectamente, intentelo despues')
            }
            alert('Eliminado correctamente')
        })
        // this.teams.remove(key).then(a => {
        //     this.leagueSvc.deleteTeam(lid, key)
        // })
        //     .catch(error => this.handleError(error))
    }

    // Deletes the entire list of items
    deleteAll(): void {
        this.teams.remove()
            .catch(error => this.handleError(error))
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

}
