import { AuthGuard } from '../shared/guard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    constructor(public afService: AuthGuard, public router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.afService.login().then((data) => {
            this.onLoggedin()
        })
    }
    loginwithemail(event, email, password){
    this.afService.loginwithemail(email,password).then((user) => {
      this.router.navigate(['']);
    }).catch((error)=> {
      console.log(error.message)
    })
  }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/']);
    }

}
