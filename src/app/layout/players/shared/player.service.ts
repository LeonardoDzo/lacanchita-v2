import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Player } from './player';
import { TeamService } from '../../teams/shared/team.service';

@Injectable()
export class PlayerService {

  private basePath: string = '/players';

  players: FirebaseListObservable<any[]> = null; //  list of objects
  player: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase,
   private teamSvc: TeamService) {

   }

  getItemsList(query={}): FirebaseListObservable<any[]> {
    this.players = this.db.list(this.basePath, {
      query: query
    });
    return this.players
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {

    const itemPath =  `${this.basePath}/${key}`;
    this.player = this.db.object(itemPath)

    return this.player
  }

  createItem(item: Player): void  {
    this.db.app.database().ref(this.basePath).push(item).then(res => {
      var value = {}
      value[res.key] =  true
     // this.teamSvc.updateItem(tid, value)
    })
    .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any): void {
    this.players.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.players.remove(key)
        .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
      this.players.remove()
        .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

}
