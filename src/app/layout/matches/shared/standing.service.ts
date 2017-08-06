
import { Injectable } from '@angular/core';
import { Match } from './match';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Standing } from './standing';
import { MatchService } from './match.service';
import { Team } from '../../teams/shared/team';
import { FutbolDayService } from '../../../shared/modules/futbol-day/shared/futbol-day.service';

@Injectable()
export class StandingService {

  private basePath: string = '/standings';

  standings: FirebaseListObservable<any[]> = null; //  list of objects
  standing: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase, private journeySvc: FutbolDayService) {

  }

  getItemsList(query = {}): FirebaseListObservable<any[]> {
    this.standings = this.db.list(this.basePath, {
      query: query
    });
    return this.standings
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.standing = this.db.object(itemPath)

    return this.standing
  }
  // getStandingMatchs(lid: string, callback) {
  //   let query = {
  //     orderByChild: "league",
  //     equalTo: lid
  //   }
  //   let query2 = {
  //     orderByChild: "leagues/" + lid,
  //     equalTo: true
  //   }

  //   var teams: Team[] = []
  //   var matches: Match[] = []
  //   var standings: StandingMatch[] = []
  //   let h2 = this.db.list("teams", query2).subscribe(t => {
  //     teams = t
  //     h2.unsubscribe()
  //     let handle = this.db.list("matches", { query }).subscribe(m => {
  //       matches = m
  //       handle.unsubscribe()
  //       teams.forEach(t => {
  //         var teamMatches = matches.filter(m => m.team1 == t.$key || m.team2 == t.$key && m.done)
  //         var standing = new StandingMatch()
  //         standing.gp = teamMatches.length
  //         standing.team = t.title
  //         standing.teamid = t.$key
  //         teamMatches.forEach( match => {
  //             if(match.team1 == t.$key) {
  //               standing.gFor += match.result1
  //               standing.gAgainst += match.result2
  //               if(match.result1 > match.result2){
  //                 standing.wins+= 1
  //               }else if (match.result1 < match.result2){
  //                 standing.loses+=1
  //               }else{
  //                 standing.tie+= 0
  //               }
  //             }else{
  //               if(match.result1 < match.result2){
  //                 standing.wins+= 1
  //               }else if (match.result1 > match.result2){
  //                 standing.loses+=1
  //               }else{
  //                 standing.tie+= 0
  //               }
  //               standing.gAgainst += match.result1
  //               standing.gFor += match.result2
  //             }
  //         })
  //         standing.gDiff = standing.gFor - standing.gAgainst
  //         standings.push(standing)
  //       })
  //       callback(standings)
  //     })
  //   })
  // }

  createItem(item: Standing): void {
    this.db.app.database().ref(this.basePath).push(item).then(res => {
    })
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: Standing, callback): void {
    this.standings.update(key, value)
      .then(snapshot => {
        callback(true)
      })
      .catch(error => {
        this.handleError(error)
        callback(false)
      })
  }
  captureResult(value: any, callback): void {
    this.standing.$ref.update(value)
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
    this.db.app.database().ref(this.basePath + "/" + key + "/teams/" + tid).remove(a => {
      console.log("deleted team")
    }).catch(error => {
      this.handleError(error)
    })
  }
  // Deletes a single item
  deleteItem(key: string): void {
    this.standings.remove(key)
      .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.standing.remove()
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
