import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApplicationService } from '../services/application.service';
import { CategoriesService } from '../services/categories.service';
import { CvService } from '../services/cv.service';
import { FavouriteService } from '../services/favourite.service';
import { JobService } from '../services/job.service';
import { SpecialtiesService } from '../services/specialties.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
jobs:any
p: number = 1;
searchjob:any
specialties:any
categories:any
showSpecialties:boolean = false
user = JSON.parse(localStorage.getItem("user")!)
appForm: FormGroup
cv: Array<File> = []
appliedJob:any
  constructor(private jobservice:JobService, 
              private favouriteservice:FavouriteService,
              private specialtisService: SpecialtiesService,
              private categoriesService:CategoriesService,
              private appService:ApplicationService,
              private formBuilder:FormBuilder,
              private cvservice: CvService) { }

  ngOnInit(): void {
    this.getJobs()
    // this.getSpecialties()
    this.getcategories()
    this.appForm = this.formBuilder.group({
      letter:['']
    })
  }
  //Job List
  getJobs(){
    this.jobservice.getJobs().subscribe((res:any)=>{
      this.jobs = res["data"].filter((element:any)=> element.confirmed == true)
      console.log(this.jobs)
    })
  }
  isCandidate(): Boolean{
    return this.user && this.user.itemtype.includes("candidates")
  }

  getByType(event:any){
    if(event.target.value == "all"){
      this.getJobs()
    }else{
      this.jobservice.getJobs().subscribe((res:any)=>{
        this.jobs = res["data"].filter((element:any)=> (element.type == event.target.value)&&(element.confirmed == true))
      })
    }
  }  

  getSpecialties(id:any){
    this.showSpecialties = true
    this.specialtisService.getSpecialtiesByCategory(id).subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }
  
  getcategories(){
    this.categoriesService.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  hideSpecialties(){
    this.showSpecialties = false
    this.getJobs()
  }

  getJobsBySpeciality(id:any){
    this.jobservice.getJobs().subscribe((res:any)=>{
      this.jobs = res["data"].filter((element:any)=>(element.speciality._id == id)&&(element.confirmed == true))
      console.log(this.jobs)
    })
  }

  confirmedJobsInSpec(listJobs:any[]){
    return listJobs.filter((element)=>(element.confirmed == true)).length
  }

  addToFavourite(offerID:any){
    if(this.user && this.user.itemtype.includes('candidates')){
      this.favouriteservice.addtoFavouriteJob({candidate: this.user._id, offer: offerID}).subscribe((res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job added to your favourite list',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (err:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'something is wrong, job exist in your favourites',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'something is wrong, login and retry',
        showConfirmButton: false,
        timer: 1500
      })
    } 
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
