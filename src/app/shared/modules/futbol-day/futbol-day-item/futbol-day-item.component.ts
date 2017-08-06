import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FutbolDay } from '../shared/futbol-day';
import { FutbolDayService } from '../shared/futbol-day.service';
import { League } from '../../../../layout/leagues/shared/league';

@Component({
  selector: 'app-futbol-day-item',
  templateUrl: './futbol-day-item.component.html',
  styleUrls: ['./futbol-day-item.component.scss']
})
export class FutbolDayItemComponent implements OnInit {

  @Input() league: League; 
  @Input() journey: FutbolDay;
  selected = false;
  constructor(private journeySvc: FutbolDayService,
   private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onEdit(){
    this.selected = true
  }
  
  updated(event){
    this.journey = event
    this.selected = false
  }

  onSelect(journey: FutbolDay) {
     this.router.navigate(['leagues/footballDay', journey.$key], {queryParams:  {
       lid: this.league.$key
     }});
  }
  deleteItem() {
    this.journeySvc.deleteItem(this.journey.$key)
  }


}
