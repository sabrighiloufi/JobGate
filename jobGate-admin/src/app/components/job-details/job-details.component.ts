import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
id = this.activatedRoute.snapshot.params["id"]
job:any
  constructor(private activatedRoute:ActivatedRoute, private jobservice:JobService, private route:Router, private commentservice:CommentsService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.getJobByID()
  }
  getJobByID(){
    this.jobservice.getJobByID(this.id).subscribe((res:any)=>{
      this.job = res["data"]
      console.log(this.job)
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
      this.route.navigateByUrl("/dashboard/confirm-jobs")
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
          this.route.navigateByUrl("/dashboard/jobs")
        })
        
      }
    })
  }

  deleteComment(id:any){
    this.commentservice.deleteComment(id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'comment deleted',
        showConfirmButton: false,
        timer: 1500
      })
      this.getJobByID()
    })    
  }
}
