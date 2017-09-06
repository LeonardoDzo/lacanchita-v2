
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../../../../layout/teams/shared/team';
import { TeamService } from '../../../../../layout/teams/shared/team.service';
@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent implements OnInit {
  @Input() team: Team;
  edit= false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private teamSvc: TeamService
  ) { }

  ngOnInit() {
  }
  onSelect() {
    this.router.navigate(['/teams', this.team.$key]);
  }
  onEdit(content) {
     this.modalService.open(content).result.then((result) => {
      // Button
    }, (reason) => {
      // Background or esc
    });
  }
  updated(event) {
    this.team = event
  }
  delete() {
    this.teamSvc.deleteItem(this.team.$key)
  }
}
