import { AuthGuard } from '../shared/guard/auth.guard';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ToastsManager } from 'ng2-toastr';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model = {
        pass: '',
        email: ''
    }
    constructor(public afService: AuthGuard, public router: Router, public snackBar: MdSnackBar) {
    }

    ngOnInit() {
    }
    login() {
        this.afService.login().then((data) => {
            this.onLoggedin()
        })
    }
    loginwithemail() {
        this.afService.loginwithemail(this.model.email, this.model.pass).then((user) => {
            this.snackBar.open('Bienvenido', '', {
                duration: 4000,
                extraClasses: ['success']
            });
            this.onLoggedin()
        }).catch((error) => {
            this.snackBar.open(error.message, '', {
                duration: 4000,
                extraClasses: ['error']
            });
            console.log(error.message)
        })
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('uid', this.afService.af.auth.currentUser.uid);
        this.router.navigate(['/']);
    }

}
