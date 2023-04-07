import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { SearchcompanyPipe } from '../pipes/searchcompany.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompaniesComponent,
    SearchcompanyPipe
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class CompaniesModule { }
