import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { SearchJobsRoutingModule } from './search-jobs-routing.module';
import { SearchJobsComponent } from './search-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchJobsComponent
  ],
  imports: [
    CommonModule,
    SearchJobsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchJobsModule { }
