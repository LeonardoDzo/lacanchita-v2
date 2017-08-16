import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Team } from './team';
import { LeagueService } from '../../leagues/shared/league.service';
@Injectable()
export class TeamService {


  private basePath: string = '/teams';

  teams: FirebaseListObservable<any[]> = null; //  list of objects
  team: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase,
    private leagueSvc: LeagueService) {

  }
  getItemsList(query = {}): FirebaseListObservable<any[]> {
    this.teams = this.db.list(this.basePath, {
      query: query
    });
    return this.teams
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
    this.db.app.database().ref(this.basePath).push(item).then(res => {
      if (lid) {
        var value = {}
        value[res.key] = true
        this.leagueSvc.addTeam(lid, value)
      }

    })
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any, callback): void {
    this.teams.update(key, value)
      .then(snapshot => {
        callback(snapshot)
      })
      .catch(error => this.handleError(error))
  }
  // Deletes a single item
  deleteItem(key: string, lid: string): void {
    this.teams.remove(key).then(a => {
      this.leagueSvc.deleteTeam(lid, key)
    })
      .catch(error => this.handleError(error))
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
