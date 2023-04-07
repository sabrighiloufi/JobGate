import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from 'helper/validation';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
resetPasswordToken = this.activatedRoute.snapshot.params["resetPasswordToken"]
resetForm:FormGroup
submitted = false

  constructor(private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder ,private router:Router, private authservice:AuthenticationService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    })
  }

  resetPassword(){
    this.submitted = true

    if (this.resetForm.invalid) {
      return;
    }
    this.authservice.resetPassword(this.resetPasswordToken, this.resetForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'password updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
     this.router.navigateByUrl("/login")
    })
  }
  get f() {
    return this.resetForm.controls;
  }
}
