import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
resetForm:FormGroup
resetPasswordToken = this.activatedRoute.snapshot.params["resetPasswordToken"]
  constructor(private activatedRoute:ActivatedRoute, private authservice:AuthService, private formbuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.resetForm = this.formbuilder.group({
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
      })
  }

  resetPassword(){
    this.authservice.resetPassword(this.resetPasswordToken, this.resetForm.value).subscribe((res:any)=>{
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'password updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
     this.route.navigateByUrl("/")
    })
  }

}
