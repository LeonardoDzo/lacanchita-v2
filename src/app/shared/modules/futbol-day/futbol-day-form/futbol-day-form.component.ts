import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FutbolDay } from '../shared/futbol-day';
import { FutbolDayService } from '../shared/futbol-day.service';
import { League } from '../../../../layout/leagues/shared/league';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-futbol-day-form',
  templateUrl: './futbol-day-form.component.html',
  styleUrls: ['./futbol-day-form.component.scss']
})
export class FutbolDayFormComponent implements OnInit {
objInit: FutbolDay;
  @Input() journey: FutbolDay = new FutbolDay();
  @Input() league: League;
  @Output() objEmmit = new EventEmitter()
  constructor(private journeySvc: FutbolDayService, private snackBar: MdSnackBar) { }

  ngOnInit() {
     this.objInit = Object.assign({}, this.journey);
     this.objInit.$key = this.journey.$key
  }

  onSubmit() {
    this.journeySvc.createItem(this.journey, this.league.$key, res => {
        if (res) {
            this.snackBar.open('Agregado correctamente', null, {
                duration: 5000,
                extraClasses: ['success']
            } )
        }else {
            this.snackBar.open('algo salio mal', null, {
                duration: 5000,
                extraClasses: ['success']
            } )
        }
    })
    this.journey = new FutbolDay()
  }

  update() {
    this.journeySvc.updateItem(this.journey.$key, this.journey, (upload) => {
      if (upload) {
        this.objEmmit.emit(upload)
      }
    })
  }
  newJourney(){
    this.journey = new FutbolDay() // reset item
  }
  cancel(){
    this.objEmmit.emit(this.objInit)
  }

}
