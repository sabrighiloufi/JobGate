import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateProfileRoutingModule } from './candidate-profile-routing.module';
import { CandidateProfileComponent } from './candidate-profile.component';


@NgModule({
  declarations: [
    CandidateProfileComponent
  ],
  imports: [
    CommonModule,
    CandidateProfileRoutingModule
  ]
})
export class CandidateProfileModule { }
