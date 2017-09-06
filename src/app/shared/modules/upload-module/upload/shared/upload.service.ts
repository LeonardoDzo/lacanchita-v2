import { Injectable } from '@angular/core';
import {Upload } from './upload'


import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
  uploads: FirebaseListObservable<any[]>;
  file: FirebaseObjectObservable<any>
  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload, callback) {
    const storageRef = this.db.app.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        callback(null)
      },
      () => {
        upload.url = this.uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload, (key) => {
          upload.$key = key
          callback(upload)
        })
      }
    );
  }
  deleteUpload(upload: Upload) {
    this.deletFileData(upload.$key)
    .then(() => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }
  private deletFileData(key: string){
    return this.db.list(`${this.basePath}/`).remove(key)
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, callback)  {
    this.db.list(`${this.basePath}/`).push(upload).then((res)=> {
       callback(res.key)
    });
  }
}
