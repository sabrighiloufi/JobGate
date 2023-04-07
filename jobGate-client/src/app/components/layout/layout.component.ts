import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  mySlideOptions={items: 4,  loop: true, 
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    rewind: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    } ,nav: true};
jobs:any
p:number = 1
paginatorCmp: number = 1
popularCmp:any [] = []
query:any
searchForm:FormGroup
categories:any
  constructor(private jobService:JobService,
              private companyService:CompaniesService,
              private formBuilder:FormBuilder,
              private categoryService:CategoriesService,
              private router:Router) { }

  ngOnInit(): void {
    this.getJobs()
    this.getPopularCompanies()
    this.getCategories()
    this.searchForm = this.formBuilder.group({
      title:[''],
      location:[''],
      category:['']
    })
  }
  //first 12 popular companies
  getPopularCompanies(){
    this.companyService.popularCompanies().subscribe((res:any)=>{
      this.popularCmp = res["data"].slice(0, 12).filter((element:any)=>(element.confirmed == true))
      console.log(this.popularCmp)
    })
   
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  getJobs(){
    this.jobService.getJobs().subscribe((res:any)=>{
      this.jobs = res["data"].filter((element:any)=>(element.confirmed == true))
      console.log(this.jobs)
    })
  }

  recentJobs(){
   this.jobService.recentJobs().subscribe((res:any)=>{
    this.jobs = res["data"]
    for(let job of this.jobs){
      this.companyService.getCompany(job.company).subscribe((res:any)=>{
        job.company = res["data"]
      })
      job.location = job.location[0]
    }
    console.log(this.jobs)
   })
  }

  jobType(type:any){
    this.jobService.getJobs().subscribe((res:any)=>{
      this.jobs = res["data"].filter((element:any)=>(element.type == type))
      console.log(this.jobs)
    })
  }

  searchJobs(){
    let title =`${this.searchForm.value.title.length>0 ? this.searchForm.value.title : ''}`

    let q: string = ''
    if(title.length>0){
      q =`q=${title}`
    }
    
    // console.log(q )
    this.router.navigate(['/search-jobs'],  { queryParams: { q: title } })
   
  }

}
