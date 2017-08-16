import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndDatePipe, FilterPipe, SortByPipe, StartDatePipe } from './pipes';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [FilterPipe, SortByPipe, StartDatePipe,EndDatePipe],
    declarations: [FilterPipe, SortByPipe, StartDatePipe,EndDatePipe]
})
export class SharedPipesModule { }
