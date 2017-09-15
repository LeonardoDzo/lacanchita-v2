import { User } from './user';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    private basePath = '/users';

    users: FirebaseListObservable<any[]> = null; //  list of objects
    user: FirebaseObjectObservable<any>; //   single object
    constructor(private db: AngularFireDatabase) { }

    getItem(key: string): FirebaseObjectObservable<any> {
        if (key.length > 0) {
            const itemPath = `${this.basePath}/${key}`;
            this.user = this.db.object(itemPath)
            return this.user
        }
    }

    createItem(item: User): void {
        this.db.app.database().ref(this.basePath).push(item).then(res => {
            console.log(res)
        })
    }

}
