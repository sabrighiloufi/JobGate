import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unconfirmed-jobs',
  templateUrl: './unconfirmed-jobs.component.html',
  styleUrls: ['./unconfirmed-jobs.component.css']
})
export class UnconfirmedJobsComponent implements OnInit {
  jobs:any
  p:number = 1
  search_name:any
  specialties:any
    constructor( private jobservice:JobService, private specialityService: SpecialityService) { }
  
    ngOnInit(): void {
      this.getJobs()
      this.getSpecialties()
    }
  
    getJobs(){
      this.jobservice.getJobs().subscribe((res:any)=>{
        this.jobs = res["data"].filter((element:any)=> element.confirmed == false)
        console.log(this.jobs)
      })
    }
    getSpecialties(){
      this.specialityService.getSpecialties().subscribe((res:any)=>{
        this.specialties = res["data"]
        console.log(this.specialties)
      })
    }
    getBySpecialties(e:any){
      this.jobservice.getJobs().subscribe((res:any)=>{
        this.jobs = res["data"].filter((element:any)=> element.speciality._id == e &&  element.confirmed == false)
      })
    }

    confirmJob(job:any){
      job.confirmed = true
      this.jobservice.update(job._id, job).subscribe((res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your changes has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.getJobs()
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
          this.jobservice.deleteJob(id).subscribe((res:any)=>{
            Swal.fire(
              'Deleted!',
              'job has been deleted.',
              'success'
            )
            this.getJobs()
          })
          
        }
      })
    }

  }
  
