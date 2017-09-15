import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { League } from '../../../../../layout/leagues/shared/league';
import { LeagueService } from '../../../../../layout/leagues/shared/league.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-league-item',
    templateUrl: './league-item.component.html',
    styleUrls: ['./league-item.component.scss']
})
export class LeagueItemComponent implements OnInit {
    @Input() league: League;
    selectedLeague: League = null;
    constructor(private leagueSvc: LeagueService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private snackBar: MdSnackBar) { }

    ngOnInit() {
    }

    onEdit(league: League, content) {
        this.selectedLeague = league
        this.modalService.open(content).result.then((result) => {

        }, (reason) => {

        });
    }
    activate(newValue) {

        this.leagueSvc.updateItem(this.league.$key, {'active': newValue}, callback => {
          this.snackBar.open(callback, '', {
              duration: 5000,
              extraClasses: ['default']
          })
      })
    }
    updated(event) {
        this.league = event
        this.selectedLeague = null
    }

    onSelect(league: League) {
        this.router.navigate(['leagues', league.$key]);
    }
    deleteItem() {
        this.leagueSvc.deleteItem(this.league.$key)
    }

}
