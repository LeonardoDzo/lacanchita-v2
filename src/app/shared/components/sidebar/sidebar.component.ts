import { Component, OnInit } from '@angular/core';
import { User } from '../../../layout/user/shared/user';
import { AuthGuard } from '../../guard/auth.guard';
import { UserService } from '../../../layout/user/shared/user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive = false;
    showMenu = '';
    user = new User()
    constructor(private afService: AuthGuard, private userSvc: UserService) {
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    ngOnInit() {
        this.afService.af.authState.subscribe(
            (auth) => {
                if (auth != null) {
                    this.userSvc.getItem(auth.uid).subscribe(user => {
                        this.user = user
                        console.log(this.user)
                    })
                }
            }
        );
    }
}
