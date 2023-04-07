import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './job-list.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchjobsPipe } from '../pipes/searchjobs.pipe';


@NgModule({
  declarations: [
    JobListComponent,
    SearchjobsPipe,
    
  ],
  exports: [SearchjobsPipe],
  imports: [
    CommonModule,
    JobListRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobListModule { }
