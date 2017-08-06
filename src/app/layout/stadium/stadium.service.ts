import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Stadium } from './stadium';

@Injectable()
export class StadiumService {

  private basePath: string = '/stadium';

  Stadiums: FirebaseListObservable<any[]>; //  list of objects
  Stadium: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase) { }

  getItemsList(query={}): FirebaseListObservable<any[]>  {
    this.Stadiums = this.db.list(this.basePath, {
      query: query
    });
    return this.Stadiums
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {
    const itemPath =  `${this.basePath}/${key}`;
    this.Stadium = this.db.object(itemPath)
    return this.Stadium
  }

  createItem(item: Stadium): void  {
    this.Stadiums.push(item)
    .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any): void {
    this.Stadiums.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.Stadiums.remove(key)
        .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
      this.Stadiums.remove()
        .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
