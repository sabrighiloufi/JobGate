import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { FormBuilder, FormGroup, Validators , FormArray , FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { TestService } from '../services/test.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
job:any
id = this.activatedRoute.snapshot.params["offer"]
number:any = Math.floor(Math.random() * 4) + 1
candidateTestRes:any[] = []
score:number
submitted = false 
user = JSON.parse(localStorage.getItem("user")!)

  constructor(private activatedRoute:ActivatedRoute,
              private jobService:JobService,
              private formBuilder: FormBuilder,
              private testService:TestService,
              private router:Router,
              private appService:ApplicationService) { }

  ngOnInit(): void {
    this.getJobByID()
    
  }


  getJobByID(){
    this.jobService.getJobByID(this.id).subscribe((res:any)=>{
      this.job = res["data"]
      console.log(this.job)
    })
  }

  randomizeArray(responses:any[]){
    return responses.map(x=>({ord:Math.random(),data:x}))
                          .sort((a,b)=>a.ord>b.ord?1:a.ord<b.ord?-1:0)
                          .map(x=>x.data)
  }


  

  applyNow(){
    if(this.user && this.submitted == false){
      this.submitted = true
      this.score = 0
      let questionValue = 100/(this.job.test.test.length)
      for(let i = 0; i < this.candidateTestRes.length; i++) {    
        const TestQuestion = this.job.test.test.find((e:any)=>(e.question == this.candidateTestRes[i].question))
        if(this.candidateTestRes[i].response.includes( TestQuestion.correctResponse)){
          this.score += questionValue
        } 
      }
     
       
      // save candidate test and apply with adding a letter
      this.testService.submit(this.job.test._id, { "candidate": this.user._id}).subscribe((res:any)=>{
        if(this.score>=50){
          Swal.fire({
            icon: 'success',
            title: `Great you get: ${this.score}% `,
            text: "Write your letter",
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: 'green'
            }).then((result) => {
            if (result.value) {
              const application = {
                offer: this.job._id,
                candidate: this.user._id,
                letter: result.value,
                score: this.score
              }
              this.appService.apply(application).subscribe((res:any)=>{
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'your application has been sended',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigateByUrl("/job-list")
              })  
            }});
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'sorry, you get a score under 50%',
            showConfirmButton: false,
            timer: 1500
          })
        }
        
      }, (err:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You cant re-submit Test',
          showConfirmButton: false,
          timer: 1500
        })
      })
      console.log(this.score)
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You cant re-submit Test',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
  }


  changeRes(e:any, question:any) {

    let found = false
    for(let i = 0; i < this.candidateTestRes.length; i++) {
        if (this.candidateTestRes[i].question == question) {
          this.candidateTestRes[i].response = e.target.value
          found = true
        }
    }
    if (found == false) {
      this.candidateTestRes.push({"question":question, "response":e.target.value}) 
    }
    console.log(this.candidateTestRes );
  }
  
}


