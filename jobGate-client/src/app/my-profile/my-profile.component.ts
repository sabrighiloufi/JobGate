import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
import { CandidateService } from '../services/candidate.service';
import { CompaniesService } from '../services/companies.service';
import { CvService } from '../services/cv.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
user = JSON.parse(localStorage.getItem("user")!)
changePwdForm:FormGroup
companyForm:FormGroup
candidateForm:FormGroup
cv: Array<File> = []
cvForm:FormGroup
favourites:any
p: number = 1

  constructor(private route:Router, 
              private authService:AuthenticationService,
              private formbuilder:FormBuilder,
              private companyService:CompaniesService,
              private candidateService:CandidateService,
              private cvservice:CvService,
              private favouriteService:FavouriteService) { }

  ngOnInit(): void {
    this.changePwdForm = this.formbuilder.group({
      password:['', Validators.required],
      newpassword:['', Validators.required],
      confirmNewPassword:['', Validators.required],
    })
    this.companyForm = this.formbuilder.group({
      fullname:['', Validators.required],
      email:['', Validators.required],
      website:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      description:['', Validators.required],
    })
    this.candidateForm = this.formbuilder.group({
      fullname:['', Validators.required],
      email:['', Validators.required],
      desired_job:['', Validators.required],
      aboutme:['', Validators.required],
    })
    this.getMyFavourites()
    
    this.PatchValues()
  }
  PatchValues(){
    if(this.user.itemtype.includes("candidates")){
      this.candidateForm.patchValue({
        fullname: this.user.fullname,
        email: this.user.email,
        desired_job: this.user.desired_job,
        aboutme: this.user.aboutme,
      })
    }
    if(this.user.itemtype.includes("companies")){
      this.companyForm.patchValue({
        fullname: this.user.fullname,
        email: this.user.email,
        website: this.user.website,
        description: this.user.description,
        phone: this.user.phone,
        address: this.user.address,
      })
    }
  }
  getMyFavourites(){
    if(this.user.itemtype.includes("candidates")){
    this.favouriteService.getMyFavouriteJobs(this.user._id).subscribe((res:any)=>{
      this.favourites = res["data"]
      console.log(this.favourites)
    })
  }
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('state');
    localStorage.removeItem('accessToken');
    this.route.navigateByUrl("/login")
  }

  isCandidate(): Boolean{
    return this.user.itemtype.includes("candidates")
  }
  isCompany(): Boolean{
    return this.user.itemtype.includes("companies")
  }

  changePwd(){
    this.authService.changePassword(this.user._id, this.changePwdForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your password has been updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.changePwdForm.reset();  
    },
    (err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'something is wrong, please verify your information',
        showConfirmButton: false,
        timer: 1500
      })
      this.changePwdForm.reset();  
    })
  }

  updateCompany(){
    this.companyService.updateCompany(this.user._id, this.companyForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your information has been updated',
        showConfirmButton: false,
        timer: 1500
      })
    },
    (err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'something is wrong, please verify your information',
        showConfirmButton: false,
        timer: 1500
      })
      
    })
  }

  updateCandidate(){
    this.candidateService.updateCandidate(this.user._id, this.candidateForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your information has been updated',
        showConfirmButton: false,
        timer: 1500
      })
    },
    (err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'something is wrong, please verify your information',
        showConfirmButton: false,
        timer: 1500
      })
      
    })
  }
  handleFileInput(file:any){
    this.cv = <Array<File>> file.target.files
  }
  uploadCV(){
    let formData = new FormData()
    formData.append("candidate", this.user._id)
    formData.append("cv", this.cv[0])
    this.cvservice.uploadCV(formData).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'cv uploaded',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  deletefavourite(id:any){
    this.favouriteService.deleteFavourite(id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'offer deleted from favourites',
        showConfirmButton: false,
        timer: 1500
      })
      this.getMyFavourites()
    })
  }
  deleteAllfavourite(){
    this.favouriteService.deleteAll(this.user._id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'all offers deleted from favourites',
        showConfirmButton: false,
        timer: 1500
      })
      this.getMyFavourites()
    })
  }
}
