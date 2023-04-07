import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Chart, registerables } from 'chart.js';
import { JobService } from 'src/app/services/job.service';
import { ApplicationService } from 'src/app/services/application.service';
Chart.register(...registerables);

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
admin = JSON.parse(localStorage.getItem("user")!)
statistic: { _id: number, total: number }[]
jobstatistic: { _id: number, totalOffers: number }[]
jobspec: { _id: number, totalOffers: number }[]
data:any = []
jobs:any
jobdata:any = []
apps:any
companies:any
jobLabels:any = []
jobStat:any = []
  constructor(private companyservice:CompanyService, private jobservice:JobService, private appservice: ApplicationService) { }

  ngOnInit(): void {
    this.getCompaniesPerMonth()
    this.getApps()
    this.getCompanies()
    this.getJobs()
    this.getjobsPerSpeciality()
  }

  getApps(){
    this.appservice.getApps().subscribe((res:any)=>{
      this.apps = res["data"]
      console.log(this.apps)
    })
  }
  getCompanies(){
    this.companyservice.getCompanies().subscribe((res:any)=>{
      this.companies = res["data"]
      console.log(this.companies)
    })
  }
  getJobs(){
    this.jobservice.getJobs().subscribe((res:any)=>{
      this.jobs = res["data"]
      console.log(this.jobs)
    })
  }

  getCompaniesPerMonth(){
    this.companyservice.getCompaniesPerMonth().subscribe((res:any)=>{
      this.statistic = res["data"]
      console.log(this.statistic)
      for (let value of this.statistic) {
        this.data[value._id-1] = value.total
      }
      for(let i=0; i<=11; i++){
        this.data[i] = this.data[i] || 0
      }
      console.log(this.data)
      //this.generateChart()
    
    })

    this.jobservice.getJobsPerMonth().subscribe((res:any)=>{
      this.jobstatistic = res["data"]
      console.log('jobstat',this.jobstatistic)
      for (let value of this.jobstatistic) {
        this.jobdata[value._id-1] = value.totalOffers
      }
      for(let i=0; i<=11; i++){
        this.jobdata[i] = this.jobdata[i] || 0
      }
      this.generateChart()
    })
  }

 

  generateChart(){
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          datasets: [{
              label: '# of companies In Month',
              data: this.data,
              
              borderWidth: 1
          },
          {
            label: '# of jobs In Month',
            data: this.jobdata,
            
            borderWidth: 1
        }
        ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  suggestedMax: 20
              }
          }
      }
  });
  }

  getjobsPerSpeciality(){
    this.jobservice.getJobsPerSpeciality().subscribe((res:any)=>{
      this.jobspec = res["data"]
      //console.log('jobs',this.jobspec)
      for(let i=0; i < this.jobspec.length; i++){
        this.jobLabels[i]= this.jobspec[i]._id
        this.jobStat[i]= this.jobspec[i].totalOffers
      }
      //console.log('test',this.jobLabels, this.jobStat)
      this.genChart()
    })
  }


  genChart(){
    const myChart = new Chart("chart", {
      type: 'bar',
      data: {
          labels: this.jobLabels,
          datasets: [{
              label: '# of jobs In each Speciality',
              data: this.jobStat,
              
              borderWidth: 1
          }
        ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  suggestedMax: 20
              }
          }
      }
  });
  }
}

