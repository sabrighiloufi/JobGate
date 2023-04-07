import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailsRoutingModule } from './job-details-routing.module';
import { JobDetailsComponent } from './job-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    JobDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class JobDetailsModule { }
