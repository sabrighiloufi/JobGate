import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageJobsRoutingModule } from './manage-jobs-routing.module';
import { ManageJobsComponent } from './manage-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { JobListModule } from '../job-list/job-list.module';

@NgModule({
  declarations: [
    ManageJobsComponent,
    
  ],
  imports: [
    CommonModule,
    ManageJobsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    JobListModule
  ]
})
export class ManageJobsModule { }
