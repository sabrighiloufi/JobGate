import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
forgotForm:FormGroup
  constructor(private authservice:AuthService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.forgotForm = this.formbuilder.group({
    email:['', [Validators.required, Validators.email]]
    })
  }

  forgotPasword(){
    this.authservice.forgotPassword(this.forgotForm.value).subscribe((res:any)=>{
      Swal.fire('Please check your email and click link to change your password')
    })
  }

}
