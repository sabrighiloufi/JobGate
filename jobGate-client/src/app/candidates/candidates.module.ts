import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  declarations: [
    CandidatesComponent
  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    NgxPaginationModule
  ]
})
export class CandidatesModule { }
