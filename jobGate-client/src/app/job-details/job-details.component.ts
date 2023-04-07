import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommentService } from '../services/comment.service';
import { ApplicationService } from '../services/application.service';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
job:any
id = this.activatedRoute.snapshot.params["id"]
commentForm: FormGroup
user = JSON.parse(localStorage.getItem("user")!)
appForm: FormGroup
cv: Array<File> = []
  constructor(
    private activatedRoute:ActivatedRoute, 
    private jobService:JobService,
    private formBuilder:FormBuilder,
    private commentService:CommentService,
    private appService:ApplicationService,
    private cvservice: CvService
    ) { }

  ngOnInit(): void {
    this.getJobByID()
    this.commentForm = this.formBuilder.group({
      comment:['', Validators.required]
    })
    this.appForm = this.formBuilder.group({
      letter:['']
    })
  }


  getJobByID(){
    this.jobService.getJobByID(this.id).subscribe((res:any)=>{
      this.job = res["data"]
      console.log(this.job)
    })
  }

  addComment(){
    if(this.user){
      let comment = {
        comment: this.commentForm.value.comment,
        offer: this.job._id,
        candidate: this.user._id
      }
      this.commentService.addComment(comment).subscribe((res:any)=>{
        this.getJobByID()
        this.commentForm.reset()
      })

    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You are not authenticated',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  handleFileInput(file:any){
    this.cv = <Array<File>> file.target.files
  }
  // Apply 
  ApplyToJob(){
 
    if(this.user && this.user.itemtype == 'candidates'){
      
      const application = {
        offer: this.job._id,
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
