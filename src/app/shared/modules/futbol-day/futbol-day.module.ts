import { MatchSharedModule } from '../match-shared/match-shared.module';
import { FutbolDayService } from './shared/futbol-day.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutbolDayComponent } from './futbol-day.component';
import { FutbolDayFormComponent } from './futbol-day-form/futbol-day-form.component';
import { FutbolDayItemComponent } from './futbol-day-item/futbol-day-item.component';
import { FormsModule } from '@angular/forms';
import { FutbolDayDetailComponent } from './futbol-day-detail/futbol-day-detail.component';
import { MdTabsModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatchSharedModule,
    MdTabsModule
  ],
  exports: [FutbolDayComponent,FutbolDayDetailComponent],
  declarations: [FutbolDayComponent,FutbolDayFormComponent,FutbolDayItemComponent,FutbolDayDetailComponent],
  providers: [FutbolDayService]
})
export class FutbolDayModule { }
