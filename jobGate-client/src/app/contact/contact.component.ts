import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
ContactForm:FormGroup
user = JSON.parse(localStorage.getItem("user")!)
submitted = false;
  constructor(private adminservice:AdminService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.ContactForm = this.formBuilder.group({
      subject:['', Validators.required],
      message:['', [
                      Validators.required,
                      Validators.minLength(20),
                      Validators.maxLength(400)
                    ]],
      email:[''],
      acceptTerms: [false, Validators.requiredTrue]
    })
  }
  submitEmail(){
    this.submitted = true;

    if (this.ContactForm.invalid) {
      return;
    }
    if(this.user){
      this.ContactForm.value.email = this.user.email
      this.adminservice.contactAdmin(this.ContactForm.value).subscribe((res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email sended to admin',
          showConfirmButton: false,
          timer: 1500
        })
        this.ContactForm.reset()
        this.submitted = false;
      })
    }
    
  }

  get f() {
    return this.ContactForm.controls;
  }


}
