import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
forgotPswdForm:FormGroup
submitted = false

  constructor(private formBuilder:FormBuilder, private authservice:AuthenticationService) { }

  ngOnInit(): void {
    this.forgotPswdForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]]
    })
  }
  onSubmit(){
    this.submitted = true

    if (this.forgotPswdForm.invalid) {
      return;
    }
    this.authservice.forgotPassword(this.forgotPswdForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Please check your email to reset password',
        showConfirmButton: false,
        timer: 1500
      })
      this.forgotPswdForm.reset()
    })
  }
  get f() {
    return this.forgotPswdForm.controls;
  }

}
