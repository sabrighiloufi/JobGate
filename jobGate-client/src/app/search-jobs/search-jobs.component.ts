import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { CvService } from '../services/cv.service';
import { JobService } from '../services/job.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit {
query :any
jobs:any
p:number = 1
user = JSON.parse(localStorage.getItem("user")!)
appForm: FormGroup
cv: Array<File> = []
appliedJob:any
  constructor(private activatedRoute:ActivatedRoute,
              private jobService:JobService,
              private appService:ApplicationService,
              private formBuilder:FormBuilder,
              private cvservice: CvService ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => this.query =params['q']);
     console.log(this.query)
     this.search()
     this.appForm = this.formBuilder.group({
      letter:['']
    })
  }

  search(){
    this.jobService.searchJobs(this.query).subscribe((res:any)=>{
      this.jobs = res["data"]
      console.log(this.jobs)
    })
  }

  handleFileInput(file:any){
    this.cv = <Array<File>> file.target.files
  }

  selectJob(jobID:any){
    if(this.user){
      this.appliedJob = jobID
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You are not authenticated. Please sign in and retry.',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //console.log(this.appliedJob)
  }

  ApplyToJob(){
 
    if(this.user && this.user.itemtype == 'candidates'){
      
      const application = {
        offer: this.appliedJob,
        candidate: this.user._id,
        letter: this.appForm.value.letter
      }
      
      let formData = new FormData()
      formData.append("candidate", this.user._id)
      formData.append("cv", this.cv[0])
      this.cvservice.uploadCV(formData).subscribe((res:any)=>{
        this.appService.apply(application).subscribe((res:any)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'your application has been sended',
            showConfirmButton: false,
            timer: 1500
          })
          this.appForm.reset()
        })

      })

      
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'you are not authenticated',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
