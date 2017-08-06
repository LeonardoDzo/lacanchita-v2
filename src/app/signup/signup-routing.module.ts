import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
    { path: '', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {

  constructor(private Af: AuthGuard){
  }
 }
