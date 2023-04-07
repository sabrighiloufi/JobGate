import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostTestRoutingModule } from './post-test-routing.module';
import { PostTestComponent } from './post-test.component';


@NgModule({
  declarations: [
    PostTestComponent
  ],
  imports: [ 
    CommonModule,
    PostTestRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PostTestModule { }
