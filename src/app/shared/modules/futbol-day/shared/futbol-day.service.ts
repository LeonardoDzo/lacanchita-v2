import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import * as firebase from 'firebase/app';
import { FutbolDay } from './futbol-day';
import { LeagueService } from '../../../../layout/leagues/shared/league.service';
@Injectable()
export class FutbolDayService {
private basePath: string = '/journeys';

  footballDays: FirebaseListObservable<any[]> = null; //  list of objects
  footballDay: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase, private leagueSvc: LeagueService) {

  }

  getItemsList(query = {}, lid:string): FirebaseListObservable<any[]> {
    this.footballDays = this.db.list('leagues/' + lid + this.basePath, {
      query: query
    });
    return this.footballDays
  }
  // Return a single observable item
  getItem(key: string,  lid:string): FirebaseObjectObservable<any> {
    const itemPath = `leagues/${lid}/${this.basePath}/${key}`;
    this.footballDay = this.db.object(itemPath)
    return this.footballDay
  }

  createItem(item: FutbolDay, lid: string, callback) {
    this.db.app.database().ref('leagues/' + lid + this.basePath).push(item).then(res => {
        callback(true)
    })
      .catch(error => {this.handleError(error)
        callback(false)
    })
  }
  // Update an existing item
  updateItem(key: string, value: any, callback): void {
    this.footballDays.update(key, value)
      .then(snapshot => {
        callback(snapshot)
      })
      .catch(error => this.handleError(error))
  }
  addMatch(lid: string, key: string, value: any, callback): void {
    this.db.app.database().ref("leagues/"+lid + "/" + this.basePath + "/" + key + "/matches").update(value).then(a => {
        callback(true, 'juego guardado')
    }).catch(error => {
      this.handleError(error)
      callback(false, error.message)
    })
  }
  // Deletes a single item
  deleteItem(key: string): void {
    this.footballDays.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.footballDays.remove()
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
