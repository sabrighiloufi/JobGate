import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { ApplicationService } from '../services/application.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {
myjobs:any
user = JSON.parse(localStorage.getItem("user")!)
viewJob:any
p: number = 1;
searchjob:any
jobToUpdate:FormGroup
showApps: Boolean = false
apps:any
appPage: number = 1
letter:any
  constructor(private jobService:JobService, private formBuilder:FormBuilder, private appService:ApplicationService) { }

  ngOnInit(): void {
    this.getMyJobs()
    this.jobToUpdate = this.formBuilder.group({
      title:['', Validators.required],
      postes:['', Validators.required],
      salary:['', Validators.required],
      expiration_date:['', Validators.required],
      description:['', Validators.required],
    })
  }

  getMyJobs(){
    this.jobService.getJobs().subscribe((res:any)=>{
      this.myjobs = res["data"].filter((element:any)=>(element.company._id == this.user._id))
      console.log(this.myjobs)
    })
  }

  deleteJob(id:any){
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
        this.jobService.deleteJob(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'Your job has been deleted.',
            'success'
          )
          this.getMyJobs()
        })
        
      }
    })
  }

  viewMyJob(job:any){
    this.viewJob = job
    // console.log(this.viewJob)
    this.jobToUpdate.patchValue({
      title :  this.viewJob.title,
      postes:this.viewJob.postes,
      salary:this.viewJob.salary,
      expiration_date:this.viewJob.expiration_date,
      description:this.viewJob.description,
    })
  }
  update(){
    this.jobService.update(this.viewJob._id, this.jobToUpdate.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'job updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.getMyJobs()
    })
  }
  getApplications(applications:any[]){
    this.showApps = true
    // console.log(applications)
    this.apps = applications
  }

  deleteApp(id:any){
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
        this.appService.deleteApp(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'Application has been deleted.',
            'success'
          )
          this.showApps = false
          this.getMyJobs()
        })
        
      }
    })
  }

  acceptApp(app:any){
    app.status = "accepted"
    this.appService.update(app._id, app).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'application accepted',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  refuseApp(app:any){
    app.status = "refused"
    this.appService.update(app._id, app).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'application refused',
        showConfirmButton: false,
        timer: 1500
      })      
    })
  }

  getLetter(letter:any){
    this.letter = letter
  }
  

}
