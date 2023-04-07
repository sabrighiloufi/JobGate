import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
import Validation from 'helper/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
candidateInfo = false
companyInfo = false
candidateForm:FormGroup
submitted = false
picture: Array<File> = []
companyForm:FormGroup
  constructor(private authService:AuthenticationService, private formBuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.candidateForm = this.formBuilder.group({
      fullname:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      desired_job:['', Validators.required],
      confirmPassword: ['', Validators.required],
      aboutme:[''],
      
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    })
    this.companyForm = this.formBuilder.group({
      fullname:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      address:['', Validators.required],
      confirmPassword: ['', Validators.required],
      description:[''],
      phone:[''],
      website:[''],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    )
  }

  showCandidateForm(){
    this.candidateInfo = true
    this.companyInfo = false

  }
  showCompanyForm(){
    this.candidateInfo = false
    this.companyInfo = true
  }

  registerCandidate(){
    this.submitted = true

    if (this.candidateForm.invalid) {
      return;
    }
    let formData = new FormData()
    formData.append("fullname", this.candidateForm.value.fullname)
    formData.append("email", this.candidateForm.value.email)
    formData.append("password", this.candidateForm.value.password)
    formData.append("aboutme", this.candidateForm.value.aboutme)
    formData.append("desired_job", this.candidateForm.value.desired_job)  
    formData.append("photo", this.picture[0])
    this.authService.registerCandidate(formData).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You are registered, Please Verify your email and login !!',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl('/login')
    })
  }
  handleFileInput(file:any){
    this.picture = <Array<File>> file.target.files

  }

  get f() {
    return this.candidateForm.controls;
  }

  //company registration
  registerCompany(){
    this.submitted = true

    if (this.companyForm.invalid) {
      return;
    }
    let formData = new FormData()
    formData.append("fullname", this.companyForm.value.fullname)
    formData.append("email", this.companyForm.value.email)
    formData.append("password", this.companyForm.value.password)
    formData.append("description", this.companyForm.value.description)
    formData.append("website", this.companyForm.value.website) 
    formData.append("phone", this.companyForm.value.phone) 
    formData.append("address", this.companyForm.value.address)  
    formData.append("photo", this.picture[0])
    this.authService.registerCompany(formData).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You are registered, Please Verify your email and login !!',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl('/login')
    })
  }
  get companyErr() {
    return this.companyForm.controls;
  }
}
