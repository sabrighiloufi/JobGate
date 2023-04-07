import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';
import { CompaniesService } from '../services/companies.service';
import { SpecialtiesService } from '../services/specialties.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
companies:any
p: number = 1
specialties:any
searchCompany:any
  constructor(private companiesService: CompaniesService,  private specialtisService: SpecialtiesService) { }

  ngOnInit(): void {
    this.getCompanies()
    this.getSpecialties()
  }

  getCompanies(){
    this.companiesService.getCompanies().subscribe((res:any)=>{
      this.companies =res['data'].filter((element:any)=>(element.confirmed == true))
      console.log(this.companies)
    })
  }
  getSpecialties(){
    this.specialtisService.getSpecialties().subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }

  getCompaniesBySpeciality(event:any){
    if(event.target.value == "all"){
      this.getCompanies()
    }else{
    this.companiesService.getCompanies().subscribe((res:any)=>{
      this.companies =res['data'].filter((element:any)=>(element.speciality._id == event.target.value)&&(element.confirmed == true))
      console.log(this.companies)
    })
  }
  }
  isEmpty(){
    
  }
}
