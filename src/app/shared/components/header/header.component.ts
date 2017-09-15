import { UserService } from './../../../layout/user/shared/user.service';
import { AuthGuard } from '../../guard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../layout/user/shared/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user = new User()

    constructor(private translate: TranslateService, public afService: AuthGuard, public router: Router, private userSvc: UserService) {

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.afService.af.authState.subscribe(
            (auth) => {
                if (auth != null) {
                    this.userSvc.getItem(auth.uid).subscribe(user => {
                        this.user = user
                        localStorage.setItem('rol', this.user.rol.toString());
                    })
                }
            }
        );
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.afService.logout()
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
