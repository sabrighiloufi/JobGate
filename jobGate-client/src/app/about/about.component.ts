import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { CompaniesService } from '../services/companies.service';
import { CvService } from '../services/cv.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
numberCVs:any
numberCompanies:any
numberJobs:any
numberCandidates:any
  constructor(private cvService:CvService,
              private companyService:CompaniesService,
              private jobService:JobService,
              private candidateService:CandidateService
              ) { }

  ngOnInit(): void {
    this.CountCVs()
    this.CountCompanies()
    this.CountJobs()
    this.CountCandidate()
  }

  CountCandidate(){
    this.candidateService.countCandidates().subscribe((res:any)=>{
      this.numberCandidates = res["data"]
      console.log(this.numberCandidates)
    })
  }

  CountJobs(){
    this.jobService.countJobs().subscribe((res:any)=>{
      this.numberJobs = res["data"]
      console.log(this.numberJobs)
    })
  }

  CountCompanies(){
    this.companyService.numberCompanies().subscribe((res:any)=>{
      this.numberCompanies = res["data"]
      console.log(this.numberCompanies)
    })
  }

  CountCVs(){
    this.cvService.numberCVs().subscribe((res:any)=>{
      this.numberCVs = res["data"]
      console.log(this.numberCVs)
    })
  }

}
