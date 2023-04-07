import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
subscriberForm:FormGroup
  constructor(private subscribeService:SubscribeService,
              private formbuilder:FormBuilder,
              private categoryService:CategoriesService
              ) { }

  ngOnInit(): void {
    this.subscriberForm = this.formbuilder.group({
      email:['', Validators.required]
    })
  }
  subscribe(){
    this.subscribeService.subscribe(this.subscriberForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Your are subscribed to JobGate with email:${this.subscriberForm.value.email}`,
        showConfirmButton: false,
        timer: 1500
      })
      this.subscriberForm.reset()
    },
    (err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Email already Exist',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }


}
