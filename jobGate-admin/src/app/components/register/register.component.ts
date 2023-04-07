import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup
submitted = false
picture: Array<File> = []

  constructor(private authservice:AuthService, private formBuilder:FormBuilder, private route :Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email:['', [Validators.required ,  Validators.email]],
      password:['', Validators.required],
      fullname:['', Validators.required],
    })
  }

  register(){
    this.submitted = true

    if (this.registerForm.invalid) {
      return;
    }
    let formData = new FormData()
    formData.append("fullname", this.registerForm.value.fullname)
    formData.append("email", this.registerForm.value.email)
    formData.append("password", this.registerForm.value.password)
      
    formData.append("photo", this.picture[0])

    this.authservice.register(formData).subscribe((res:any)=>{
      console.log(res["data"])
      
      this.route.navigateByUrl('/')
    })
  
  }
  handleFileInput(file:any){
    this.picture = <Array<File>> file.target.files

  }

  get f() {
    return this.registerForm.controls;
  }
  
}
