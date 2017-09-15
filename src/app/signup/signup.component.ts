import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthGuard } from '../shared/guard/auth.guard';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    model = {
        name: '',
        password: '',
        rpass: '',
        email: '',
        type: 1
    }
    constructor(private authSvc: AuthGuard) { }

    ngOnInit() { }

    onSubmit() {
        if (this.model.password === this.model.rpass ) {
            this.authSvc.registerUser(this.model.email, this.model.password, this.model.name, this.model.type)
        }else {
            alert('Contraseñas no coinicden')
        }
    }
}
