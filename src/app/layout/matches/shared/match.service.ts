import { Injectable } from '@angular/core';
import { Match } from './match';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FutbolDayService } from '../../../shared/modules/futbol-day/shared/futbol-day.service';


@Injectable()
export class MatchService {

  private basePath: string = '/matches';

  matches: FirebaseListObservable<any[]> = null; //  list of objects
  match: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase, private journeySvc: FutbolDayService) {

  }

  getItemsList(query = {}): FirebaseListObservable<any[]> {
    this.matches = this.db.list(this.basePath, {
      query: query
    });
    return this.matches
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.match = this.db.object(itemPath)

    return this.match
  }

  createItem(item: Match): void {
    this.db.app.database().ref(this.basePath).push(item).then(res => {
       //created game
       const value = {}
       value[res.key] = true
       this.journeySvc.addMatch(item.league, item.footballDay, value, callback => {
                alert('juego agregado')
       })
    })
    .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any, callback): void {
    this.matches.update(key, value)
      .then(snapshot => {
        callback(snapshot)
      })
      .catch(error => this.handleError(error))
  }
  captureResult(value: any, callback): void {
    this.match.$ref.update(value)
      .then(snapshot => {
        callback(snapshot)
      })
      .catch(error => this.handleError(error))
  }
  addTeam(key: string, value: any): void {
    this.db.app.database().ref(this.basePath + "/" + key + "/teams").update(value).then(a => {
      console.log("save team")
    }).catch(error => {
      this.handleError(error)
    })
  }
  deleteTeam(key: string, tid: string): void {
    this.db.app.database().ref(this.basePath + "/" + key + "/teams/"+tid).remove( a => {
      console.log("deleted team")
    }).catch(error => {
      this.handleError(error)
    })
  }
  // Deletes a single item
  deleteItem(key: string): void {
    this.matches.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.matches.remove()
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
