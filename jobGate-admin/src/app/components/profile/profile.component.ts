import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  admin = JSON.parse(localStorage.getItem("user")!)
  picture = this.admin.image
  adminForm:FormGroup
  profilePhoto: Array<File> = []
  changePwdForm:FormGroup
  constructor(private adminservice:AdminService, private route:Router, private formbuilder:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
    this.adminForm = this.formbuilder.group({
      email:['', Validators.email],
      fullname:[''],
      aboutme:[''],
    })
    this.adminForm.patchValue({
      fullname: this.admin.fullname, 
      email: this.admin.email, 
      aboutme: this.admin.aboutme, 
      
    })
    this.changePwdForm = this.formbuilder.group({
      password:['', Validators.required],
      newpassword:['', Validators.required],
      confirmNewPassword:['', Validators.required],
    })
  }

  deleteAccount(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminservice.deleteProfile(this.admin._id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'account has been deleted.',
            'success'
          )
          localStorage.clear()
          this.route.navigateByUrl("/")
        })
       
      }
    })
  }

  updateAccount(){
    
    let formData = new FormData()
        formData.append("fullname", this.adminForm.value.fullname)
        formData.append("email", this.adminForm.value.email)
        formData.append("aboutme", this.adminForm.value.aboutme)  
        formData.append("photo", this.profilePhoto[0])
    
        this.adminservice.updateProfile(this.admin._id, formData).subscribe((res:any)=>{
          console.log(res["data"])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAdmin()
        })

  }
  getAdmin(){
    this.adminservice.getAdmin(this.admin._id).subscribe((res:any)=>{
      localStorage.setItem('user', JSON.stringify(res.data))
      this.admin = res["data"]
    })
  }

  handleFileInput(file:any){
    this.profilePhoto = <Array<File>> file.target.files

  }

  changePwd(){
    this.authService.changePassword(this.admin._id, this.changePwdForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your password has been updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.changePwdForm.reset();  
    })
  }
}
  