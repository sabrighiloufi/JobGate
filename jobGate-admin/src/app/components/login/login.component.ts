import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
submitted = false;
  constructor(private authservice:AuthService, private formBuilder:FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required ,  Validators.email]],
      password:['', Validators.required],
    })
  }

  login(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authservice.signin(this.loginForm.value).subscribe((res:any)=>{
      console.log(res["data"])
      if(res["data"].itemtype == 'admins'){
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('state', '0')
        this.route.navigateByUrl("/dashboard").then(() => {
          window.location.reload();
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops... your are not admin',
        })
      }
    
      
    },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... user not found',
          text: 'email invalid!',
          footer: 'password invalid'
        })
        console.log(err)
      }
    )
  }

  get f() {
    return this.loginForm.controls;
  }
}
