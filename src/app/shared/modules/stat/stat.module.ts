import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { FormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdInputModule,
        FormsModule,
    ],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule { }
