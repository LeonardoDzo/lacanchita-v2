import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../shared/player';
import { PlayerService } from '../shared/player.service';
import { slideToTop } from '../../../router.animations';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [slideToTop()]
})
export class PlayerComponent implements OnInit {
  closeResult =""
  players: Player[];
  constructor(private playerSvc: PlayerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.playerSvc.getItemsList({})
      .subscribe((players: [Player]) => {
        this.players = players
      })
  }
   open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
