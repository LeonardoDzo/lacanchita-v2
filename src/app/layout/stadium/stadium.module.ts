import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StadiumRoutingModule } from './stadium-routing.module';
import { StadiumComponent } from './stadium.component';

@NgModule({
  imports: [
    CommonModule,
    StadiumRoutingModule
  ],
  declarations: [StadiumComponent]
})
export class StadiumModule { }
