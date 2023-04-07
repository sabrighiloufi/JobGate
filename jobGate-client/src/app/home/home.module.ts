import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { FooterComponent } from '../components/footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
