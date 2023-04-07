import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css']
})
export class PostTestComponent implements OnInit {
test:Array<any>= [] 
questionForm:FormGroup
responses: Array<any> = []
offerId= this.activatedRoute.snapshot.params["id"]
  constructor(private formBuilder:FormBuilder, private testService:TestService, private route:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question:['', Validators.required],
      correctResponse:['', Validators.required],
      response1:[''],
      response2:[''],
      response3:[''],
      response4:[''],
      responses:this.formBuilder.array([]),
      
    })
  }
  
  pushQuestion(){
    
    this.questionForm.value.correctResponse = this.questionForm.value.response1
    this.responses.push( {"response":this.questionForm.value.response1})
    this.responses.push( {"response":this.questionForm.value.response2})
    this.responses.push( {"response":this.questionForm.value.response3})
    this.responses.push( {"response":this.questionForm.value.response4})
    this.questionForm.value.responses=this.responses
    this.responses = []
    
    this.test.push( this.questionForm.value)
    console.log(this.test)
  }

  submitTest(){
    
    this.testService.createTest({"test":this.test, "offer":this.offerId}).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Test has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/")
    })
  }
}
