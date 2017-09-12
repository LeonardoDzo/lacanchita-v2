import { Component, OnInit } from '@angular/core';
import {Stadium } from './stadium';
import {StadiumService} from './stadium.service';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {jsonpFactory} from '@angular/http/src/http_module';


@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',

  styleUrls: ['./stadium.component.scss'],
  providers: [StadiumService]

})
export class StadiumComponent implements OnInit {
  public title = 'Canchas'

  public stadiums: FirebaseListObservable<any[]>;
  public stadium = new Stadium()

  constructor(private _stadium_service:StadiumService,private route: ActivatedRoute,
              private router: Router){}

  ngOnInit() {
    this.stadiums = this._stadium_service.getItemsList({limitToLast: 10});
  }

  onSubmit() {
    this._stadium_service.createItem(this.stadium)
    this.stadium = new Stadium();
  }

  changeStatus(st, key) {
    console.log(st.target.checked)
    console.log(key)
    const data = {};
    data['active'] = st.target.checked;
    this._stadium_service.updateItem(key, data);
  }

  /*onEdit(stadium: Stadium) {
    this.router.navigate(['/stadium', stadium.$key]);
  }*/
}
