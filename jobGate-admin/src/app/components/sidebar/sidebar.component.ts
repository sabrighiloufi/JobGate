import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  year = new Date().getFullYear()
  confirmedJobs:any
  unConfirmedJobs:any
  confirmedCompanies:any
  unconfirmedCompanies:any
  constructor(private jobservice: JobService, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.getConfirmedJobs()
    this.getUnconfirmedJobs()
    this.getConfirmedCompanies()
    this.getUnConfirmedCompanies()
  }

  getConfirmedJobs(){
    this.jobservice.getJobs().subscribe((res:any)=>{
      this.confirmedJobs = res["data"].filter((element:any)=> element.confirmed == true)
      // console.log(this.confirmedJobs)
    })
  }
  getUnconfirmedJobs(){
    this.jobservice.getJobs().subscribe((res:any)=>{
      this.unConfirmedJobs = res["data"].filter((element:any)=> element.confirmed == false)
      // console.log(this.unConfirmedJobs)
    })
  }

  getConfirmedCompanies(){
    this.companyService.getCompanies().subscribe((res:any)=>{
      this.confirmedCompanies = res["data"].filter((element:any)=> element.confirmed == true)
     
      console.log(this.confirmedCompanies)
      
    })
  }
  getUnConfirmedCompanies(){
    this.companyService.getCompanies().subscribe((res:any)=>{
      this.unconfirmedCompanies = res["data"].filter((element:any)=> element.confirmed == false)
     
      console.log(this.unconfirmedCompanies)
      
    })
  }
}
